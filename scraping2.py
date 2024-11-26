import requests
from bs4 import BeautifulSoup

def scrape_reviews(url, output_file):
    try:
        # Send a GET request to fetch the webpage content
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors

        # Parse the content using BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Example: Finding review elements by a specific HTML tag/class
        reviews = soup.find_all('div', class_='col-lg-8 ps-lg-5')  # Adjust tag/class based on the website

        if not reviews:
            print("No reviews found. Please check the HTML structure or URL.")
            return

        # Open the file to save the reviews
        with open(output_file, 'w', encoding='utf-8') as file:
            for i, review in enumerate(reviews, 1):
                text = review.get_text(strip=True)  # Extract and clean the review text
                file.write(f"Review {i}:\n{text}\n\n")

        print(f"Scraped {len(reviews)} reviews and saved them to '{output_file}'.")
    except requests.exceptions.RequestException as e:
        print(f"Error fetching the webpage: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

# URL of the webpage containing reviews
URL = "https://www.softwareadvice.ie/software/397757/office-365?page=237"  # Replace this with the actual review page URL

# File to store the scraped reviews
OUTPUT_FILE = "reviews.txt"

# Call the function to scrape and save reviews
scrape_reviews(URL, OUTPUT_FILE)
