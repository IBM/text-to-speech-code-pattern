import os, time, sys, datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

# Do an action on the app's landing page
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(options=options)
driver.get(os.environ.get("APP_URL", "http://localhost:5000/")); # Open a browser to the app's landing page

time.sleep(3) # Init time needed?

audio_button = driver.find_element_by_class_name('audio-output')
src = audio_button.get_attribute("src")
print("AUDIO SOURCE: ", src)

# Press the button
synthesize_button = driver.find_element_by_xpath("//button[contains(text(),'Synthesize')]") # Locate the button
synthesize_button.click()

time.sleep(5)

# Input text
text_to_say = driver.find_element_by_id("text-input").text
print("SAY: ", text_to_say)

expected = "Conscious of its spiritual and moral heritage"
if expected in text_to_say:
    print("First Test Successful")
else:
    sys.exit("Experience Test Failed")

# Test that we got some audio
audio_button = driver.find_element_by_class_name('audio-output')
src = audio_button.get_attribute("src")
print("AUDIO SOURCE: ", src)

expected = "api/synthesize?text=Conscious+of+its+spiritual+and+moral+heritage"
if expected in src:
    print("Experience Test Successful")
else:
    sys.exit("Experience Test Failed")

