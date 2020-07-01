import os
import time
import sys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Do an action on the app's landing page
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(options=options)

success = False

try:
    app_url = os.environ.get("APP_URL", "http://localhost:5000/")
    print("APP_URL: ", app_url)
    driver.get(app_url)  # Open a browser to the app's landing page

    time.sleep(3)  # Init time needed?

    print("Title: ", driver.title)
    expected_title = "Text to Speech"
    if driver.title != expected_title:
        raise Exception("Title should be " + expected_title)

    audio_button = driver.find_element_by_class_name('audio-output')
    src = audio_button.get_attribute("src")
    print("AUDIO SOURCE: ", src)

    # Find button and click it
    synthesize_button = driver.find_element_by_xpath("//button[contains(text(),'Synthesize')]")
    synthesize_button.click()

    time.sleep(20)

    # Verify the action on the app's landing page
    # Input text
    text_to_say = driver.find_element_by_id("text-input").text
    print("SAY: ", text_to_say)

    expected = "Conscious of its spiritual and moral heritage"
    if expected not in text_to_say:
        raise Exception("Did not get the expected text to say")
    else:
        print("First Test Successful")

    # Test that we got some audio
    audio_button = driver.find_element_by_class_name('audio-output')
    src = audio_button.get_attribute("src")
    print("AUDIO SOURCE: ", src)

    expected = "api/synthesize?text=Conscious+of+its+spiritual+and+moral+heritage"
    if expected not in src:
        raise Exception("Did not get the expected audio src")
    else:
        print("Second Test Successful")

    success = True

except Exception as e:
    print("Exception: ", e)
    raise

finally:
    driver.quit()
    if success:
        print("Experience Test Successful")
    else:
        sys.exit("Experience Test Failed")