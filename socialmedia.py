import requests
import re
from html.parser import HTMLParser

# Social media domain regex pattern
SOCIAL_MEDIA_PATTERN = re.compile(
    r"(facebook\.com|twitter\.com|linkedin\.com|instagram\.com|youtube\.com|"
    r"tiktok\.com|pinterest\.com|snapchat\.com|reddit\.com)", re.IGNORECASE
)

class SocialMediaLinkFinder(HTMLParser):
    def _init_(self):
        super()._init_()
        self.social_links = []

    def handle_starttag(self, tag, attrs):
        # Look for <a> tags with "href" attributes
        if tag == "a":
            for attr_name, attr_value in attrs:
                if attr_name == "href" and attr_value:
                    # Check if the href matches the social media pattern
                    if SOCIAL_MEDIA_PATTERN.search(attr_value):
                        self.social_links.append(attr_value)

def check_any_social_media_presence(url, max_links=100):
    try:
        # Send a GET request with a timeout
        response = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Failed to retrieve {url}: {e}")
        return

    # Use the custom HTML parser
    parser = SocialMediaLinkFinder()
    parser.feed(response.text)

    # Get the detected social media links
    social_media_links = parser.social_links[:max_links]  # Limit to max_links

    # Output the result
    if social_media_links:
        print(f"Social media presence detected for {url}:")
        for sm_link in social_media_links:
            print(f"- {sm_link}")
    else:
        print(f"No social media presence found for {url}.")

# Example usage
website_url = "https://www.myntra.com"  # Replace with the desired URL
check_any_social_media_presence(website_url)