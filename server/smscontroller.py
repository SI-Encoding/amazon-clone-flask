import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
from settings import TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN

account_sid = TWILIO_ACCOUNT_SID
auth_token = TWILIO_AUTH_TOKEN
twilio_client = Client(account_sid, auth_token)
