import webapp2
import main

app = webapp2.WSGIApplication([ ('/', main.WelcomePage),
								('/main', main.MainPage),
								('/submitspot', main.SubmitSpot)
								],debug=True)
