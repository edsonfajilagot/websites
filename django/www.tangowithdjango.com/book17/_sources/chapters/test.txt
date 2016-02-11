.. _test-chapter:

Automated Testing
=================

It is good practice to get into the habit of writing and developing tests. A lot of software engineering is about writing and developing tests and test suites in order to ensure the software is robust. Of course, most of the time, we are too busy trying to build things to bother about making sure that they work. Or too arrogant to believe it would fail.

According to the `Django Tutorial  <https://docs.djangoproject.com/en/1.7/intro/tutorial05/>`_, there are numerous reasons why you should include tests:

* Test will save you time: a change in a complex system can cause failures in unpredictable places.
* Tests dont just identify problems, they prevent them: tests show where the code is not meeting expectations.
* Test make your code more attractive: "Code without tests is broken by design", Jacob Kaplan-Moss, One of Django's original developers.
* Tests help teams work together: they make sure your team doesn't inadvertently break your code.



According to the Python Guide `<http://docs.python-guide.org/en/latest/writing/tests/>`_, there are a number of general rules you should try to follow when writing tests. Below are some main rules:

* Tests should focus on one small bit of functionality
* Tests should have a clear purpose
* Tests should be independent. 
* Run your tests, before you code, and before your commit and push your code.
* Even better create a hook that tests code on push.
* Use long and descriptive names for tests.


.. note:: Currently this chapter provides the very basics of testing and follows a similar format to the `Django Tutorial  <https://docs.djangoproject.com/en/1.7/intro/tutorial05/>`_, with some additional notes. We hope to expand this further in the future.


Running Tests
-------------

In built in Django is machinery to test the applications built. You can do this by issuing the following command:

.. code-block:: guess

	$ python manage.py test rango
	
	Creating test database for alias 'default'...

	----------------------------------------------------------------------
	Ran 0 tests in 0.000s

	OK
	Destroying test database for alias 'default'...
	
	
This will run through the tests associated with the rango application. At the moment, nothing much happens. That is because you may have noticed the file ``rango/tests.py`` only contains an import statement. Everytime you create an application, Django automatically creates such a file to encourage you to write tests. 

From this output, you might also notice that a database called ``default`` is referred to. When you run tests, a temporary database is constructed, which your tests can populate, and perform operations on. This way your testing is performed independently of your live database. 



Testing the models in Rango
---------------------------

Ok, lets create a test. In the Category model, we want to ensure that views are either zero or positive, because the number of views, let's say, can never be less than zero. To create a test for this we can put the following code into ``rango/tests.py``:

.. code-block:: python


	from django.test import TestCase

	from rango.models import Category

	class CategoryMethodTests(TestCase):

	    def test_ensure_views_are_positive(self):

	        """
			ensure_views_are_positive should results True for categories where views are zero or positive
	        """
			cat = Category(name='test',views=-1, likes=0)
			cat.save()
			self.assertEqual((cat.views >= 0), True)



The first thing you should notice, if you have not written tests before, is that we have to inherit from TestCase. The naming over the method in the class also follows a convention, all tests start with ``test_`` and they also contain some type of assertion, which is the test. Here we are check if the values are equal, with the ``assertEqual`` method, but other types of assertions are also possible. See the Python Documentation on unit tests, https://docs.python.org/2/library/unittest.html for other commands (i.e. ``assertItemsEqual``, ``assertListEqual``, ``assertDictEqual``, etc). Django's testing machinery is derived from Python's but also provides an number of other asserts and specific test cases.


Now lets run test:


.. code-block::  guess

	$ python manage.py test rango
	
	
	Creating test database for alias 'default'...
	F
	======================================================================
	FAIL: test_ensure_views_are_positive (rango.tests.CategoryMethodTests)
	----------------------------------------------------------------------
	Traceback (most recent call last):
	  File "/Users/leif/Code/tango_with_django_project_17/rango/tests.py", line 12, in test_ensure_views_are_positive
	    self.assertEqual((cat.views>=0), True)
	AssertionError: False != True

	----------------------------------------------------------------------
	Ran 1 test in 0.001s

	FAILED (failures=1)
	


As we can see this test fails. This is because the model does not check whether the value is less than zero or not. Since we really want to ensure that the values are non-zero, we will need to update the model, to ensure that this requirement is fulfilled. Do this now by adding some code to the Category models, ``save()`` method, that checks the value of views, and updates it accordingly.


Once you have updated your model, you can now re-run the test, and see if your code now passes it. If not, try again.

Let's try adding another test, that ensures an appropriate slug line is created i.e. one with dashes, and in lowercase. Add the following code to ``rango/tests.py``:

.. code-block:: python


	   def test_slug_line_creation(self):
	   		"""
			slug_line_creation checks to make sure that when we add a category an appropriate slug line is created
			i.e. "Random Category String" -> "random-category-string"
			"""

			cat = Category('Random Category String')
			cat.save()
			self.assertEqual(cat.slug, 'random-category-string')


Does your code still work?



Testing Views
-------------
So far we have writtent tests that focus on ensuring the integrity of the data housed in the models. Django also provides testing mechanisms to test views. It does this with a mock client, that internally calls a django view via the url. In the test you have access to the response (including the html) and the context dictionary. 

Let's create a test that checks that when the index page loads, it displays the message that ``There are no categories present``, when the Category model is empty. 

.. code-block:: python

	from django.core.urlresolvers import reverse


	class IndexViewTests(TestCase):

	    def test_index_view_with_no_categories(self):
	        """
	        If no questions exist, an appropriate message should be displayed.
	        """
	        response = self.client.get(reverse('index'))
	        self.assertEqual(response.status_code, 200)
	        self.assertContains(response, "There are no categories present.")
	        self.assertQuerysetEqual(response.context['categories'], [])
	

 
First of all, the django ``TestCase`` has access to a ``client`` object, which can make requests. Here, it uses the helper function ``reverse`` to look up the url of the ``index`` page. Then it tries to get that page, where the ``response`` is stored. The test then checks a number of things: did the page load ok? Does the response, i.e. the html contain the phrase "There are no categories present.", and does the context dictionary contain an empty categories list. Recall that when you run tests, a new database is created, which by default is not populated.


Let's now check the resulting view when categories are present. First add a helper method.


.. code-block:: python

	from rango.models import Category

	def add_cat(name, views, likes):
    	c = Category.objects.get_or_create(name=name)[0]
    	c.views = views
    	c.likes = likes
    	c.save()
    	return c


Then add another method to the ``class IndexViewTests(TestCase)``:


.. code-block:: python	

    def test_index_view_with_categories(self):
        """
        If no questions exist, an appropriate message should be displayed.
        """

        add_cat('test',1,1)
        add_cat('temp',1,1)
        add_cat('tmp',1,1)
        add_cat('tmp test temp',1,1)

        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "tmp test temp")

        num_cats =len(response.context['categories'])
        self.assertEqual(num_cats , 4)


In this test, we populate the database with four categories, and then check if the page loads, if it contains the text ``tmp test temp`` and if the number of categories is equal to 4.


#TODO(leifos): add in some tests showing how to test different forms i.e. login etc.

Testing the Rendered Page
-------------------------
#TODO(leifos): add an example using either Django's test client and/or Selenium, which is are "in-browser" frameworks to test the way the HTML is rendered in a browser.


Coverage Testing
----------------
Code coverage measures how much of your code base has been tested, and how much of your code has been put through its paces via tests. You can install a package called ``coverage`` via with ``pip install coverage`` which automatically analyses how much code coverage you have. Once you have ``coverage`` installed, run the following command:

.. code-block:: guess

	$ coverage run --source='.' manage.py test rango
	

This will run through all the tests and collect the coverage data for the rango application. To see the coverage report you need to then type:


.. code-block:: guess

	$ coverage report
	
	Name                                       Stmts   Miss  Cover
	--------------------------------------------------------------
	manage                                         6      0   100%
	populate                                      33     33     0%
	rango/__init__                                 0      0   100%
	rango/admin                                    7      0   100%
	rango/forms                                   35     35     0%
	rango/migrations/0001_initial                  5      0   100%
	rango/migrations/0002_auto_20141015_1024       5      0   100%
	rango/migrations/0003_category_slug            5      0   100%
	rango/migrations/0004_auto_20141015_1046       5      0   100%
	rango/migrations/0005_userprofile              6      0   100%
	rango/migrations/__init__                      0      0   100%
	rango/models                                  28      3    89%
	rango/tests                                   12      0   100%
	rango/urls                                    12     12     0%
	rango/views                                  110    110     0%
	tango_with_django_project/__init__          0      0   100%
	tango_with_django_project/settings         28      0   100%
	tango_with_django_project/urls              9      9     0%
	tango_with_django_project/wsgi              4      4     0%
	--------------------------------------------------------------
	TOTAL                                        310    206    34%
	


We can see from the above report that critical parts of the code have not been tested, ie. ``rango/views``. For more details about using the package ``coverage`` visit: http://nedbatchelder.com/code/coverage/ 




Exercises
---------

* Lets say that we want to extend the ``Page`` to include two additional fields, ``last_visit`` and ``first_visit`` which will be of type ``timedate``.
	* Update the model to include these two fields
	* Update the add page functionality, and the goto functionality.
	* Add in a test to ensure the last visit or first visit is not in the future
	* Add in a test to ensure that the last visit equal to or after the first visit.
	* Run through  `Part Five of the official Django Tutorial  <https://docs.djangoproject.com/en/1.7/intro/tutorial05/>`_ to help develop these tests.
	 
* Check out the `tutorial on test driven development by Harry Percival <http://www.tdd-django-tutorial.com>`_.

