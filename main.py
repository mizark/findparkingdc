import utils

import os
import re
import random
import hashlib
import hmac
from string import letters
import json
import urllib
import urllib2
import webapp2
import jinja2
import time

from google.appengine.ext import db
from google.appengine.api import memcache

class WelcomePage(utils.SiteHandler):
    def get(self):
        self.render("welcome.html")

class MainPage(utils.SiteHandler):
    def get(self):
        self.render("main.html")

class ParkingSpot(db.Model):
	latitude=db.FloatProperty()
	longitude=db.FloatProperty()
	created = db.DateTimeProperty(auto_now_add = True)

	def as_dict(self):
		time_fmt="%c"
		d={'latitude': self.latitude,
           'longitude': self.longitude,
           'created': self.created.strftime(time_fmt)}
		return d


class SubmitSpot(utils.SiteHandler):

	def post(self):
		point = json.loads(self.request.body)
		latitude= point['latitude']
		longitude= point['longitude']
		s=ParkingSpot(latitude=latitude, longitude=longitude)
		s.put()


	def get(self):
		spots = ParkingSpot.all()
		self.render_json([s.as_dict() for s in spots])


