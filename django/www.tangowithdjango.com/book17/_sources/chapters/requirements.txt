.. _requirements-label:

Getting Ready to Tango
======================
Let's get set up! To tango with Django, you'll need to ensure that you have everything you need installed on your computer and that you have a sound understanding of your development environment. This chapter walks you through what you need and what you need to know.

For this tutorial, you'll require the following key pieces of software.

* Python version 2.7.5+
* Django version 1.7

As Django is a web application framework written in the Python programming language, you will be required to have a working knowledge of Python. If you haven't used Python before or you simply wish to brush up on your skills, then we highly recommend that you check out and work through one or more of the following guides.

* **A quick tutorial** - Learn Python in 10 Minutes by Stavros, http://www.korokithakis.net/tutorials/python/.
* **The Official Python Tutorial** at http://docs.python.org/2/tutorial/.
* **A brilliant book**: Think Python: How to Think like a Computer Scientist by Allen B. Downey, available online at http://www.greenteapress.com/thinkpython/.
* **An amazing online course**: Learn to Program, by Jennifer Campbell and Paul Gries at https://www.coursera.org/course/programming1.

Using the Terminal
------------------
In order to set up your environment learning how to use the *Command Line Interpreter (CLI)* provided by your Operating System is really important. Through the course of this tutorial, you will be interacting with the CLI routinely. If you are already familiar with using the command line interface you can skip directly to :ref:`Installing the Software <installing-software>` section.

UNIX-based operating systems all use a similar-looking `terminal <http://www.ee.surrey.ac.uk/Teaching/Unix/unixintro.html>`_. Descendants, derivatives and clones of UNIX include `Apple's OS X <http://en.wikipedia.org/wiki/OS_X>`_ and the `many available Linux distributions <http://en.wikipedia.org/wiki/List_of_Linux_distributions>`_ available today. All of these operating systems contain a core set of commands which help you navigate through your filesystem and launch programs, all without the need of any graphical interface. This section provides the key commands you should familiarise yourself with.

.. note:: This tutorial is focused towards users of UNIX-based or UNIX-derived operating systems. While Python and Django can run in a Windows-based environment, many of the commands that we use in this book are for  UNIX-based terminals. These commands can however be replicated in Windows by using the graphical user interface, `using the relevant command in a Windows Command Prompt <http://www.ai.uga.edu/mc/winforunix.html>`_, or using `Windows PowerShell <http://technet.microsoft.com/en-us/library/bb978526.aspx>`_ which provides an CLI like similar to a UNIX terminal.

Upon launching a new terminal instance, you'll typically be presented with something like:

.. code-block:: guess
	
	sibu:~ leif$

This is called the *prompt*, and indicates when the system is waiting to execute your every command. The prompt you see varies depending on the operating system you are using, but all look generally very similar. In the example above, there are three key pieces of information to observe:

* your username and computer name (username of ``leif`` and computer name of ``sibu``);
* your *current working directory* (the tilde, or ``~``); and
* the privilege of your user account (the dollar sign, or ``$``).

The dollar sign (``$``) typically indicates that the user is a standard user account. Conversely, a hash symbol (``#``) may be used to signify the user logged in has `root privileges <http://en.wikipedia.org/wiki/Superuser>`_. Whatever symbol is present is used to signify that the computer is awaiting your input. 

Open up a terminal window and see what your prompt looks like.

When you are using the terminal, it is important to know where you are in the file system. To find out where you are, you can issue the command ``pwd``. This will display your present working directory. For example, check the example terminal interactions below.

.. code-block:: guess
	
	Last login: Mon Sep 23 11:35:44 on ttys003
	sibu:~ leif$ pwd
	/Users/leif
	sibu:~ leif$

You can see that the present working directory in this example is: ``/Users/leif``.

You'll also note that the prompt indicates that my present working directory is ~. This is because the tilde (``~``) represents your *home directory*. The base directory in any UNIX-based file system is the *root directory*. The path of the root directory is denoted by a single forward slash (``/``).

If you are not in your home directory you can change directory (``cd``) to your home directory by issuing the following command.

.. code-block:: guess
	
	$ cd ~

Let's create a directory called ``code``. To do thus, use the make directory command (``mkdir``), as shown below.

.. code-block:: guess
	
	$ mkdir code
	
To move to the newly-created ``code`` directory, enter ``cd code``. If you now check your current working directory, you'll notice that you will be in ``~/code/``. This may also be reflected by your prompt. Note in the example below that the current working directory is printed after the ``sibu`` computer name.

.. note:: Whenever we refer to ``<workspace>``, we'll be referring to your ``code`` directory.

.. code-block:: guess
	
	sibu:~ leif$ mkdir code
	sibu:~ leif$ cd code
	sibu:code leif$ 
	sibu:code leif$ pwd
	/Users/leif/code

To list the files that are in a directory, you can issue the command ``ls``. You can also see hidden files or directories - if you have any - you can issue the command ``ls -a``, where ``a`` stands for *all.* If you ``cd`` back to your home directory (``cd ~``) and then issue ``ls``, you'll see that you have something called ``code`` in your home directory.

To find out a bit more about what is in your directory, issue ``ls -l``. This will provide a more detailed *listing* of your files and whether it is a directory or not (denoted by a ``d`` at the start of the line).

.. code-block:: guess
	
	sibu:~ leif$ cd ~ 
	sibu:~ leif$ ls -l 
	
	drwxr-xr-x   36 leif  staff    1224 23 Sep 10:42 code

The output also contains information on the `permissions associated to the directory <http://www.elated.com/articles/understanding-permissions/>`_, who created it (``leif``), the group (``staff``), the size, the date/time the file was modified at, and, of course, the name.

You may also find it useful to be able to edit files within your terminal. There are many editors which you can use - some of which may already be installed on your computer. The `nano <http://www.nano-editor.org/>`_ editor for example is a straightforward editor - unlike `vi <http://en.wikipedia.org/wiki/Vi>`_ which can take some time to learn. Below are a list of commonly-used UNIX commands that you will find useful.

Core Commands
*************
All UNIX-based operating systems come with a series of built-in commands - with most focusing exclusively on file management. The commands you will use most frequently are listed below, each with a short explanation on what they do and how to use them.

- ``pwd``: *Prints* your current *working directory* to the terminal. The full path of where you are presently is displayed.
- ``ls``: Prints a list of files in the current working directory to the terminal. By default, you do not see the sizes of files - this can be achieved by appending ``-lh`` to ``ls``, giving the command ``ls -lh``.
- ``cd``: In conjunction with a path, allows you to *change* your current working *directory*. For example, the command ``cd /home/leif/`` changes the current working directory to ``/home/leif/``. You can also move up a directory level without having to provide the `absolute path <http://www.uvsc.edu/disted/decourses/dgm/2120/IN/steinja/lessons/06/06_04.html>`_ by using two dots, e.g. ``cd ..``.
- ``cp``: Copies files and/or directories. You must provide the *source* and the *target*. For example, to make a copy of the file ``input.py`` in the same directory, you could issue the command ``cp input.py input_backup.py``.
- ``mv``: Moves files/directories. Like ``cp``, you must provide the *source* and *target*. This command is also used to rename files. For example, to rename ``numbers.txt`` to ``letters.txt``, issue the command ``mv numbers.txt letters.txt``. To move a file to a different directory, you would supply either an absolute or relative path as part of the target - like ``mv numbers.txt /home/david/numbers.txt``.
- ``mkdir``: Creates a directory in your current working directory. You need to supply a name for the new directory after the ``mkdir`` command. For example, if your current working directory was ``/home/david/`` and you ran ``mkdir music``, you would then have a directory ``/home/david/music/``. You will need to then ``cd`` into the newly created directory to access it.
- ``rm``: Shorthand for *remove*, this command removes or deletes files from your filesystem. You must supply the filename(s) you wish to remove. Upon issuing a ``rm`` command, you will be prompted if you wish to delete the file(s) selected. You can also remove directories `using the recursive switch <http://www.computerhope.com/issues/ch000798.htm>`_. Be careful with this command - recovering deleted files is very difficult, if not impossible!
- ``rmdir``: An alternative command to remove directories from your filesystem. Provide a directory that you wish to remove. Again, be careful: you will not be prompted to confirm your intentions.
- ``sudo``: A program which allows you to run commands with the security privileges of another user. Typically, the program is used to run other programs as ``root`` - the `superuser <http://en.wikipedia.org/wiki/Superuser>`_ of any UNIX-based or UNIX-derived operating system.

.. note:: This is only a brief list of commands. Check out ubuntu's documentation on `Using the Terminal <https://help.ubuntu.com/community/UsingTheTerminal>`_  for a more detailed overview, or the `Cheat Sheet 
 <http://fosswire.com/post/2007/08/unixlinux-command-cheat-sheet/>`_ by FOSSwire for a quick reference guide.

.. _installing-software:

Installing the Software
-----------------------
Now that you have a decent understanding of how to interact with the terminal, you can begin to install the software required for this tutorial.

Installing Python
*****************
So, how do you go about installing Python 2.7.5 on your computer? You may already have Python installed on your computer - and if you are using a Linux distribution or OS X, you will definitely have it installed. Some of your operating system's functionality `is implemented in Python <http://en.wikipedia.org/wiki/Yellowdog_Updater,_Modified>`_, hence the need for an interpreter!

Unfortunately, nearly all modern operating systems utilise a version of Python that is older than what we require for this tutorial. There's many different ways in which you can install Python, and many of them are sadly rather tricky to accomplish. We demonstrate the most commonly used approaches, and provide links to additional reading for more information.

.. warning:: This section will detail how to run Python 2.7.5 *alongside* your current Python installation. It is regarded as poor practice to remove your operating system's default Python installation and replace it with a newer version. Doing so could render aspects of your operating system's functionality broken!

Apple OS X
..........
The most simple way to get Python 2.7.5 installed on your Mac is to download and run the simple installer provided on the official Python website. You can download the installer by visiting the webpage at http://www.python.org/getit/releases/2.7.5/.

.. warning:: Ensure that you download the ``.dmg`` file that is relevant to your particular OS X installation!

#. Once you have downloaded the ``.dmg`` file, double-click it in the Finder.
#. The file mounts as a separate disk and a new Finder window is presented to you.
#. Double-click the file ``Python.mpkg``. This will start the Python installer.
#. Continue through the various screens to the point where you are ready to install the software. You may have to provide your password to confirm that you wish to install the software.
#. Upon completion, close the installer and eject the Python disk. You can now delete the downloaded ``.dmg`` file.

You should now have an updated version of Python installed, ready for Django! Easy, huh?

Linux Distributions
...................
Unfortunately, there are many different ways in which you can download, install and run an updated version of Python on your Linux distribution. To make matters worse, methodologies vary from distribution to distribution. For example, the instructions for installing Python on `Fedora <https://github.com/yyuu/pyenv>`_ may differ from those to install it on an `Ubuntu <http://www.ubuntu.com/>`_ installation.

However, not all hope is lost. An awesome tool (or a *Python environment manager*) called `pyenv <https://github.com/utahta/pythonbrew>`_ can help us address this difficulty. It provides an easy way to install and manage different versions of Python, meaning you can leave your operating system's default Python installation alone. Hurrah!

Taken from the instructions provided from `the pyenv GitHub page <https://github.com/yyuu/pyenv>`_, the following steps will install Python 2.7.9 on your Linux distribution.

1. Open a new terminal instance.
2. Install curl
::
	$ sudo apt-get install curl
3. Install ``pyenv``
::
	$ curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
This will download the installer and run it within your terminal for you. This installs pyenv into the directory ``~/.pyenv``. Remember, the tilde (``~``) represents your home directory!

4. Add to `.bashrc`
::
	$ nano ~/.bashrc

	export PATH="$HOME/.pyenv/bin:$PATH"
	eval "$(pyenv init -)"
	eval "$(pyenv virtualenv-init -)"
`pyenv` will likely tell you to do this once installed.
To edit the file ``~/.bashrc`` in a text editor (such as `gedit`, `nano`, `vi` or `emacs`)

5. Once you have saved the updated ``~/.bashrc`` file, close your terminal and open a new one. This allows the changes you make to take effect.

6. There are often `build problems <https://github.com/yyuu/pyenv/wiki/Common-build-problems>`_ to avoid these
::
	$ sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
	libreadline-dev libsqlite3-dev wget curl llvm

7. Install a Python version of your choosing
::
	$ pyenv install 2.7.9
This will install Python version 2.7.9 into `~/.pyenv/versions`

8. Now you can change the `local` or `global` version of Python
::
	$ pyenv versions
	* system
	  2.7.9

	$ pyenv global 2.7.9

.. note:: Directories and files beginning with a period or dot can be considered the equivalent of *hidden files* in Windows. `Dot files <http://en.wikipedia.org/wiki/Dot-file>`_ are not normally visible to directory-browsing tools, and are commonly used for configuration files. You can use the ``ls`` command to view hidden files by adding the ``-a`` switch to the end of the command, giving the command ``ls -a``.

.. _requirements-install-python-windows:

Windows
.......
By default, Microsoft Windows comes with no installations of Python. This means that you do not have to worry about leaving existing versions be; installing from scratch should work just fine. You can download a 64-bit or 32-bit version of Python from `the official Python website <http://www.python.org/download/>`_. If you aren't sure which one to download, you can determine if your computer is 32-bit or 64-bit by looking at the instructions provided `on the Microsoft website <http://windows.microsoft.com/en-gb/windows7/32-bit-and-64-bit-windows-frequently-asked-questions>`_.

#. When the installer is downloaded, open the file from the location to which you downloaded it.
#. Follow the on-screen prompts to install Python.
#. Close the installer once completed, and delete the downloaded file.

Once the installer is complete, you should have a working version of Python ready to go. By default, Python 2.7.5 is installed to the folder ``C:\Python27``. We recommend that you leave the path as it is.

Upon the completion of the installation, open a Command Prompt and enter the command ``python``. If you see the Python prompt, installation was successful. However, in certain circumstances, the installer may not set your Windows installation's ``PATH`` environment variable correctly. This will result in the ``python`` command not being found. Under Windows 7, you can rectify this by performing the following:

#. Click the *Start* button, right click *My Computer* and select *Properties*.
#. Click the *Advanced* tab.
#. Click the *Environment Variables* button.
#. In the *System variables* list, find the variable called *Path*, click it, then click the *Edit* button.
#. At the end of the line, enter ``;C:\python27;C:\python27\scripts``. Don't forget the semicolon - and certainly *do not* add a space.
#. Click OK to save your changes in each window.
#. Close any Command Prompt instances, open a new instance, and try run the ``python`` command again.

This should get your Python installation fully working. Windows XP, `has slightly different instructions <http://www.computerhope.com/issues/ch000549.htm>`_, and `so do Windows 8 installationsthis <http://stackoverflow.com/a/14224786>`_.

Setting Up the ``PYTHONPATH``
*****************************
With Python now installed, we now need to check that the installation was successful. To do this, we need to check that the ``PYTHONPATH``
`environment variable <http://en.wikipedia.org/wiki/Environment_variable>`_ is setup correctly. ``PYTHONPATH`` provides the Python interpreter with the location of additional Python `packages and modules <http://stackoverflow.com/questions/7948494/whats-the-difference-between-a-python-module-and-a-python-package>`_ which add extra functionality to the base Python installation. Without a correctly set ``PYTHONPATH``, we'll be unable to install and use Django!

First, let's verify that our ``PYTHONPATH`` variable exists. Depending on the installation technique that you chose, this may or may not have been done for you. To do this on your UNIX-based operating system, issue the following command in a terminal.

.. code-block:: guess
	
	$ echo $PYTHONPATH

On a Windows-based machine, open a Command Prompt and issue the following.

.. code-block:: guess
	
	$ echo %PYTHONPATH%

If all works, you should then see output that looks something similar to the example below. On a Windows-based machine, you will obviously see a Windows path, most likely originating from the C drive.

.. code-block:: guess
	
	/opt/local/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages:

This is the path to your Python installation's ``site-packages`` directory, where additional Python packages and modules are stored. If you see a path, you can continue to the next part of this tutorial. If you however do not see anything, you'll need to do a little bit of detective work to find out the path. On a Windows installation, this should be a trivial exercise: ``site-packages`` is located within the ``lib`` folder of your Python installation directory. For example, if you installed Python to ``C:\Python27``, ``site-packages`` will be at ``C:\Python27\Lib\site-packages\``.

UNIX-based operating systems however require a little bit of detective work to discover the path of your ``site-packages`` installation. To do this, launch the Python interpreter. The following terminal session demonstrates the commands you should issue.

.. code-block:: python
	
	$ python
	
	Python 2.7.5 (v2.7.5:ab05e7dd2788, May 13 2013, 13:18:45) 
	[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
	Type "help", "copyright", "credits" or "license" for more information.
	
	>>> import site
	>>> print site.getsitepackages()[0]
	
	'/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages'
	
	>>> quit()

Calling ``site.getsitepackages()`` returns a list of paths that point to additional Python package and module stores. The first typically returns the path to your ``site-packages`` directory - changing the list index position may be required depending on your installation. If you receive an error stating that ``getsitepackages()`` is not present within the ``site`` module, verify you're running the correct version of Python. Version 2.7.5 should include this function. Previous versions of the language do not include this function.

The string which is shown as a result of executing ``print site.getsitepackages()[0]`` is the path to your installation's ``site-packages`` directory. Taking the path, we now need to add it to your configuration. On a UNIX-based or UNIX-derived operating system, edit your ``.bashrc`` file once more, adding the following to the bottom of the file.


.. code-block:: guess
	
	export PYTHONPATH=$PYTHONPATH:<PATH_TO_SITE-PACKAGES>

Replace ``<PATH_TO_SITE-PACKAGES>`` with the path to your ``site-packages`` directory. Save the file, and quit and reopen any instances of your terminal.

On a Windows-based computer, you must follow the instructions shown in Section :num:`requirements-install-python-windows` to bring up the environment variables settings dialog. Add a ``PYTHONPATH`` variable with the value being set to your ``site-packages`` folder, which is typically ``C:\Python27\Lib\site-packages\``.

Using Setuptools and Pip
************************
Installing and setting up your development environment is a really important part of any project. While it is possible to install Python Packages such as Django separately, this can lead to numerous problems and hassles later on. For example, how would you share your setup with another developer? How would you set up the same environment on your new machine? How would you upgrade to the latest version of the package? Using a package manager removes much of the hassle involved in setting up and configuring your environment. It will also ensure that the package you install is the correct for the version of Python you are using, along with installing any other packages that are dependent upon the one you want to install.

In this book, we will be using *Pip*. Pip is a user-friendly wrapper over the *Setuptools* Python package manager. Because Pip depends on Setuptools, we are required to ensure that both are installed on your computer.

To start, we should download Setuptools from the `official Python package website <https://pypi.python.org/pypi/setuptools/1.1.6>`_. You can download the package in a compressed ``.tar.gz`` file. Using your favourite file extracting program, extract the files. They should all appear in a directory called ``setuptools-1.1.6`` - where ``1.1.6`` represents the Setuptools version number. From a terminal instance, you can then change into the directory and execute the script ``ez_setup.py`` as shown below.

.. code-block:: guess
	
	$ cd setuptools-1.1.6
	$ sudo python ez_setup.py

In the example above, we also use ``sudo`` to allow the changes to become system-wide. The second command should install Setuptools for you. To verify that the installation was successful, you should be able to see output similar to that shown below.

.. code-block:: guess
	
	Finished processing dependencies for setuptools==1.1.6

Of course, ``1.1.6`` is substituted with the version of Setuptools you are installing. If this line can be seen, you can move onto installing Pip. This is a trivial process, and can be completed with one simple command. From your terminal instance, enter the following.

.. code-block:: guess
	
	$ sudo easy_install pip

This command should download and install Pip, again with system-wide access. You should see the following output, verifying Pip has been successfully installed.

.. code-block:: guess
	
	Finished processing dependencies for pip

Upon seeing this output, you should be able to launch Pip from your terminal. To do so, just type ``pip``. Instead of an unrecognised command error, you should be presented with a list of commands and switches that Pip accepts. If you see this, you're ready to move on!

.. note:: With Windows-based computers, follow the same basic process. You won't need to enter the ``sudo`` command, however.

Installing Django
*****************
Once the Python package manager Pip is successfully installed on your computer, installing Django is easy. Open a Command Prompt or terminal window, and issue the following command.

.. code-block:: guess
	
	$ pip install -U django==1.7

If you are using a UNIX-based operating system and receive complaints about insufficient permissions, you will need to run the command with elevated privileges using the ``sudo`` command. If this is the case, you must then run the following command instead.

.. code-block:: guess
	
	$ sudo pip install -U django==1.7

The package manager will download Django and install it in the correct location for you. Upon completion, Django should be successfully installed. Note, if you didn't include the ``==1.7``, then a different version of Django may be installed.

Installing the Python Imaging Library
*************************************
During the course of building Rango, we will be uploading and handling images. This means we will need support from the `Pillow (Python Imaging Library) <https://pillow.readthedocs.org/en/latest/>`_. To install this package issue the following command.

.. code-block:: guess
	
	$ pip install pillow

Again, use ``sudo`` if required. 


Installing Other Python Packages
********************************
It is worth noting that additional Python packages can be easily downloaded using the same manner. `The Python Package Index <https://pypi.python.org/pypi>`_ provides a listing of all the packages available through Pip.

To get a list of the packages installed, you can run the following command.

.. code-block:: guess
	
	$ pip list

Sharing your Package List
*************************
You can also get a list of the packages installed in a format that can be shared with other developers. To do this issue the following command.

.. code-block:: guess
	
	$ pip freeze > requirements.txt

If you examine ``requirements.txt`` using either the command ``more``, ``less`` or ``cat``, you will see the same information but in a slightly different format. The ``requirements.txt`` can then use to install the same setup by issuing the following command. This is incredibly useful for setting up your environment on another computer, for example.

::
	
	$ pip install -r requirements.txt

Integrated Development Environment
----------------------------------
While not absolutely necessary, a good Python-based integrated development environment (IDE) can be very helpful to you during the development process. Several exist, with perhaps JetBrains' `*PyCharm* <http://www.jetbrains.com/pycharm/>`_ and *PyDev* (a plugin of the `Eclipse IDE <http://www.eclipse.org/downloads/>`_) standing out as popular choices. The `Python Wiki <http://wiki.python.org/moin/IntegratedDevelopmentEnvironments>`_ provides an up-to-date list of Python IDEs.

Research which one is right for you, and be aware that some may require you to purchase a licence. Ideally, you'll want to select an IDE that supports integration with Django. PyCharm and PyDev both support Django integration out of the box - though you will have to point the IDE to the version of Python that you are using.



Virtual Environments
********************
We're almost all set to go! However, before we continue, it's worth pointing out that while this setup is fine to begin with, there are some drawbacks. What if you had another Python application that requires a different version to run? Or you wanted to switch to the new version of Django, but still wanted to maintain your Django 1.7 project?

The solution to this is to use `virtual environments <http://simononsoftware.com/virtualenv-tutorial/>`_. Virtual environments allow multiple installations of Python and their relevant packages to exist in harmony. This is the generally accepted approach to configuring a Python setup nowadays.  


They are pretty easy to setup, once you have pip installed, and you know the right commands. You need to install a couple of additional packages.

::
	
	$ pip install virtualenv
	$ pip install virtualenvwrapper
	

The first package provides you with the infrastructure to create a virtual environment.  See `a non-magical introduction to Pip and Virtualenv for Python Beginners <http://dabapps.com/blog/introduction-to-pip-and-virtualenv-python/>`_ by Jamie Matthews for details about using virtualenv. However, using just *virtualenv* alone is rather complex. The second package provides a wrapper to the functionality in the virtualenv package and makes life a lot easier. 


If you are using a linux/unix based OS, then to use the wrapper you need to call the following shell script from your command line:
::

	$ source virtualenvwrapper.sh

It is a good idea to add this to your bash/profile script. So you dont have to run it each and every time you want to use virtualenvironments.

However, if you are using windows, then install the `virtualenvwrapper-win <https://pypi.python.org/pypi/virtualenvwrapper-win>`_ package:


::

	$ pip install virtualenvwrapper-win
	

	
Now you should be all set to create a virtual environment:

::

	$ mkvirtualenv rango

You can list the virtual environments created with ``lsvirtualenv``, and you can activate a virtual environment as follows:

::

	$ workon rango
	(rango)$
	
Your prompt with change and the current virtual environment will be displayed, i.e. rango. Now within this environment you will be able to install all the packages you like, without interferring with your standard or other environements. Try ``pip list`` to see you dont have Django or Pillow installed in your virtual environment. You can now install them with pip so that they exist in your virtual environment.

Later on when we go to deploy the application, we will go through a similar process see Chapter :ref:`Deploying your Application<virtual-environment>` and set up a virtual environment on PythonAnywhere.

Code Repository
***************
We should also point out that when you develop code, you should always house your code within a version-controlled repository such as `SVN <http://subversion.tigris.org/>`_ or `GIT <http://git-scm.com/>`_. We won't be going through this right now so that we can get stuck into developing an application in Django. We have however provided a :ref:`crash course on GIT <git-crash-course>`. We highly recommend that you set up a GIT repository for your own projects. Doing so could save you from disaster.




Exercises
---------
To get comfortable with your environment, try out the following exercises.

* Install Python 2.7.5+ and Pip.
* Play around with your CLI and create a directory called ``code``, which we use to create our projects in.
* Install the Django and Pillow packages.
* Setup your Virtual Environment
* Setup your account on GitHub
* Download and setup a Integrated Development Environemnt (like PyCharm)
* We have made the code for the book and application that you build available on GitHub, see `Tango With Django Book <https://github.com/leifos/tango_with_django_book>`_  and  `Rango Application <https://github.com/leifos/tango_with_django>`_ .
	* If you spot any errors or problem with the book, you can make a change request! 
	* If you have any problems with the exercises, you can check out the repository and see how we completed them.

