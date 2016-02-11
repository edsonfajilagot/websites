.. _login-redux-label:

User Authentication with Django-Registration-Redux
==================================================

There are numerous add-on applications that have been developed that provide login, registration and authentication mechanisms. Since most applications will provide such facilitaties there is little point re-writing / re-inventing the urls, views, and templates. In this chapter, we are going to use the package ``django-registration-redux`` to provide these facilities. This will mean we will need re-factor our code - however, it will provide with some experience of using external applications, how easily they can be plugged into your Django project, along with login facilities with all the bells and whistles. It will also make our application much cleaner.


.. note:: This chapter is not neccessary. You can skip it, but we will be assuming that you have upgraded the authentication mechanisms, in subsequent chapters.



Setting up Django Registration Redux
------------------------------------

To start we need to first install ``django-registration-redux``:

..


	$ pip install django-registration-redux



Now that it is installed, we need to tell Django that we will be using this application. Open up the ``settings.py`` file, and update the ``INSTALLED_APPS`` tuple:


.. code-block:: python
	
	
	INSTALLED_APPS = (
    	'django.contrib.admin',
    	'django.contrib.auth',
    	'django.contrib.contenttypes',
    	'django.contrib.sessions',
    	'django.contrib.messages',
    	'django.contrib.staticfiles',
    	'rango',
    	'registration', # add in the registration package
	)

While you are in the ``settings.py`` file you can also add:

.. code-block:: python
	

	REGISTRATION_OPEN = True 		# If True, users can register
	ACCOUNT_ACTIVATION_DAYS = 7 	# One-week activation window; you may, of course, use a different value.
	REGISTRATION_AUTO_LOGIN = True  # If True, the user will be automatically logged in.
	LOGIN_REDIRECT_URL = '/rango/'  # The page you want users to arrive at after they successful log in
	LOGIN_URL = '/accounts/login/'  # The page users are directed to if they are not logged in, 
									# and are trying to access pages requiring authentication
	
	
These settings should be self explanatory. Now, in ``tango_with_django_project/urls.py`` you can update the ``urlpatterns`` so it includes a reference to the registration package:


.. code-block:: python

	urlpatterns = patterns('',
  			
    	url(r'^admin/', include(admin.site.urls)),
    	url(r'^rango/', include('rango.urls')),
    	url(r'^accounts/', include('registration.backends.simple.urls')),
	)


The ``django-registration-redux`` package provides a number of different registration backends, depending on your needs. For example you may want a two-step process, where user are sent a confirmation email, and a verification link. Here we will be using the simple one-step registration process, where a user sets up their account by entering in a username, email, and password, and is automatically logged in.


Functionality and URL mapping
-----------------------------

The Django Registration Redux package provides the machinery for numerous functions. In the ``registration.backend.simple.urls``, it provides:

* registration  -> ``/accounts/register/``
* registration complete -> ``/accounts/register/complete``
* login  -> ``/accounts/login/``
* logout  -> ``/accounts/logout/``
* password change -> ``/password/change/``
* password reset -> ``/password/reset/``

While in the ``registration.backends.default.urls`` it also provides the functions for activating the account in a two stage process:

* activation complete (used in the two-step registration) -> ``activate/complete/``
* activate (used if the account actiona fails) -> ``activate/<activation_key>/``
* activation email (notifies the user an activation email has been sent out)

	* activation email body (a text file, that contains the activation email text)
	* activation email subject (a text file, that contains the subject line of the activation email)



Now the catch. While Django Registration Redux provides all this functionality, it does not provide the templates. So we need to provide the templates associated with each view. 


Setting up the Templates
------------------------

In the quickstart guide, see https://django-registration-redux.readthedocs.org/en/latest/quickstart.html, it provides an overveiw of what templates are required, but it is not immediately clear what goes within each template.

However, it is possible to download a set of tempaltes from Anders Hofstee's GitHub account, see
https://github.com/macdhuibh/django-registration-templates, and from here you can see what goes into the templates. We will use these templates as our guide here.


First, create a new directory in the ``templates`` directory, called ``registration``. This is where we will house all the pages associated with the Django Registration Redux application, as it will look in this directory for the templates it requires.



Login Template
...............

In ``templates/registration`` create the file, ``login.html`` with the following code:

.. code-block:: html


	{% extends "rango/base.html" %}
	
	{% block body_block %}
	<h1>Login</h1>
		<form method="post" action=".">
  			{% csrf_token %} 
  			{{ form.as_p }}

  	  		<input type="submit" value="Log in" />
  			<input type="hidden" name="next" value="{{ next }}" />
			</form>

		<p>Not  a member? <a href="{% url 'registration_register' %}">Register</a>!</p>
	{% endblock %}


Notice that whenever a url is referenced, the ``url`` template tag is used to reference it. If you visit, http://127.0.0.1:8000/accounts/ then you will see the list of url mappings, and the names assocaited with each url.


Registration Template
.....................

In ``templates/registration`` create the file, ``registration_form.html`` with the following code:

.. code-block:: html

	{% extends "rango/base.html" %}


	{% block body_block %}
	<h1>Register Here</h1>
		<form method="post" action=".">
  			{% csrf_token %}
  	  		{{ form.as_p }}

  			<input type="submit" value="Submit" />
		</form>
	{% endblock %}



Registration Complete Template
...............................

In ``templates/registration`` create the file, ``registration_complete.html`` with the following code:

.. code-block:: html

	{% extends "rango/base.html" %}


	{% block body_block %}
	<h1>Registration Complete</h1>
		<p>You are now registered</p>
	{% endblock %}


Logout Template
...............................

In ``templates/registration`` create the file, ``logout.html`` with the following code:

.. code-block:: html

	{% extends "rango/base.html" %}


	{% block body_block %}
	<h1>Logged Out</h1>
		<p>You are now logged out.</p>
	{% endblock %}



Try out the Registration Process
.................................
Run the runserver and visit: http://127.0.0.1:8000/accounts/register/

Note how the registration form contains two fields for password - so that it can be checked. Try registering, but enter different passwords. 

While this works, not everything is hooked up, and we still have some legacy code.


Refactoring your project
.........................

Now you will need to update the ``base.html`` so that the new registration url/views are used:

* Update register to point to ``<a href="{% url 'registration_register' %}">``
* login to point to ``<a href="{% url 'auth_login' %}">``, and
* logout to point to ``<a href="{% url 'auth_logout' %}?next=/rango/">``
* In ``settings.py``, update ``LOGIN_URL`` to be ``'/accounts/login/'``.

Notice that for the logout, we have included a ``?next=/rango/``. This is so when the user logs out, it will redirect them to the index page of rango. If we exclude it, then they will be directed to the log out page (but that would not be very nice).

Next de-commission the ``register``,  ``login``, ``logout`` functionality from the 
``rango`` application, i.e. remove the urls, views, and templates (or comment them out).



Modifying the Registration Flow
...............................

At the moment, when users register, it takes them to the registration complete page. This feels a bit clunky, so instead, we can take them to the main index page. This can be done by overriding the ``RegistrationView`` provided by ``registration.backends.simple.views``. To do this, the ``tango_with_django_project/urls.py``, import  ``RegistrationView``, add in a new registration class and then update the urlpatterns as follows:

.. code-block:: python


	from registration.backends.simple.views import RegistrationView
	
	# Create a new class that redirects the user to the index page, if successful at logging
	class MyRegistrationView(RegistrationView):
	    def get_success_url(self,request, user):
	        return '/rango/'


	urlpatterns = patterns('',
	    url(r'^admin/', include(admin.site.urls)),
	    url(r'^rango/', include('rango.urls')),
		#Add in this url pattern to override the default pattern in accounts.
	    url(r'^accounts/register/$', MyRegistrationView.as_view(), name='registration_register'),
	    url(r'^accounts/', include('registration.backends.simple.urls')),
	)




#TODO(leifos): Add in a customized registration form..



Exercises
---------
* Provide users with password change functionality


	
	
