.. _new17-label:



New in TwD 1.7
==============

.. warning:: Please note that this version of the book is still in the draft phase. Though it should all pretty much work (however some links and screenshots need to be updated). Please report any bugs, problems, etc, or submit change requests via GitHub: https://github.com/leifos/tango_with_django_book/tree/master/17 


In this version of the online tutorial / book, we have updated and added a number of things:

* The code has been ported to work with Django 1.7
	
	* The database interaction has been updated from ``syncdb`` to ``migratesql`` and ``migrate``
	* Rendering responses has been updated from ``render_to_response`` to ``render``. So now there is no need to request the context in every view.
	* The ``url`` template tag is now being used in templates, which provides a relative reference to urls rather than an absolute reference..
	* Loading static files in the templates is now done with {% load staticfiles %}
	* Using ``slugify`` to create well formed URL strings

* A new chapter on authentication has been added

	* Where the login and registration is done with Django-Registration-Redux (see Chapter :ref:`login-redux-label`)

* The Bootstrap chapter has been updated to use Bootstrap 3.2.0 (see Chapter :ref:`bootstrap-chapter`)

	* Also, includes some notes on how to use Django-Bootstrap-Toolkit
	
* A new chapter has been added on using template tags (see Chapter :ref:`template-tag-chapter` )

* Add a chapter on using JQuery with Django (see Chapter :ref:`jquery`)

* The chapter on testing has been expanded - but is still a work in progress (see Chapter :ref:`test-chapter`)

	* Includes how to use the package ``coverage`` to measure test coverage (see http://nedbatchelder.com/code/coverage/ )
	
	

	
	
	
