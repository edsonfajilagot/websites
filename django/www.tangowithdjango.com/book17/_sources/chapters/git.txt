.. _git-crash-course:

A Git Crash Course
------------------
We strongly recommend that you spend some time familiarising yourself with a version control system. For your benefit, this section provides you with a crash course in how to use `Git <http://en.wikipedia.org/wiki/Git_(software)>`_, one of the many version control systems available. Originally developed by `Linus Torvalds <http://en.wikipedia.org/wiki/Linus_Torvalds>`_, Git is today very popular, and is used by open-source and closed-source projects alike.

This tutorial demonstrates at a high level how Git works, explains the basic commands that you can use, and provides an explanation of Git's workflow.

Why Use Version Control?
************************
As your software engineering skills develop, you will find that you are able to plan and implement ever more complex solutions to ever more complex problems. As a rule of thumb, the larger the problem specification, the more code you have to write. The more code you write, the greater the emphasis you should put on software engineering practices. Such practices include the use of design patterns and the DRY (don't repeat yourself) principle.

Most projects have many files and many people working on those files. This is a recipe for chaos. Have you ever encountered one or more of the following situations:

* Made a change to code, realised it was a mistake and wanted to go back?
* Lost code (through a faulty drive), or had a backup that was too old?
* Had to maintain multiple versions of a product (perhaps for different organisations)?
* Wanted to see the difference between two (or more) versions of your codebase?
* Wanted to show that a particular change broke of fixed a piece of code?
* Wanted to submit a change (patch) to someone else's code?
* Wanted to see how much work is being done (where it was done, when it was done, or who did it)?
* Wanted to experiment with a new feature without interfering without working code?

Using a version control system makes your life easier in *all* of the above cases. While using version control systems at the beginning may seem like a hassle it will pay off later - so get into the habit now.

Git on Windows
**************
Like Python, Git doesn't come as part of a standard Windows installation. However, Windows implementations of the version control system can be downloaded and installed. You can download the official Windows Git client from the Git `website <http://git-scm.com/download/win>`_. The installer provides the ``git`` command line program, which we use in this crash course.

You can also download a program called *TortoiseGit*, a graphical extension to the Windows Explorer shell. The program provides a really nice right-click Git context menu for files. This makes version control really easy to use. You can `download TortoiseGit from here <https://code.google.com/p/tortoisegit/>`_. Although we do not cover TortoiseGit in this crash course, many tutorials exist online for it. Check `this TortoiseGit tutorial <http://robertgreiner.com/2010/02/getting-started-with-git-and-tortoisegit-on-windows/>`_ if you are interested in using it.

The Git System
**************
Essentially, Git comprises of four separate storage locations: your *workspace*, the local *index*, the *local repository* and the *remote repository*. As the name may suggest, the remote repository is stored on some remote server - and is the only part of Git stored outwith your computer. This is considered a huge advantage of Git - you can make changes to your local repository when you may not have Internet access, and then apply those changes to the remote repository at a later stage.

.. note:: We keep repeating the word *repository*, but what do we actually mean by that? In the context of version control systems, consider a repository as a form of data structure that contains a set of *commit objects*, and a set of references to commit objects, called *heads*. You can find out more about what these are on `this Git tutorial <http://www.sbf5.com/~cduan/technical/git/git-1.shtml>`_ - and we will be explaining what the terminology for head means later on.

For now though, the following bullet points provide an explanation of each part of the Git system.

* As already explained, the *remote repository* is the copy of your project's repository stored on some remote server. This is particularly important for Git projects that have more than one contributor - you require a central place to store all the work that your team members produce. If you're feeling adventurous, you can set up a Git server on a computer with Internet access and a properly configured firewall (check out `this Git server tutorial <http://www.seifeet.com/2012/11/centos-63-configuring-git-server.html>`_, for example), or use one of many services providing free Git repositories. One of the most widely-used services available today is `GitHub <https://github.com/>`_. In fact, this book has a Git `repository <https://github.com/leifos/tango_with_django>`_ on GitHub!

* The *local repository* is a copy of the remote repository. The key difference however is that the local repository is stored on your own computer. It is to this repository you make all your additions, changes and deletions. When you reach a particular milestone, you can then push all your local changes to the remote repository. From there, you can instruct your team members to retrieve your changes. This concept is known as *pulling* from the remote repository, and we will explain that in a bit more detail later.

* The *index* is technically part of the local repository. The index stores a list of files that you want to be managed with version control. This is explained in more detail in the commands and workflow section. You can have a look `here <http://stackoverflow.com/questions/4084921/what-does-the-git-index-exactly-contains>`_ to see a discussion on what exactly a Git index contains.

* The final aspect of Git is your *workspace*. Think of this folder or directory as the place on your computer where you make changes to your version controlled files. From within your workspace, you can add new files or modify or remove previously existing ones. From there, you then instruct Git to update the repositories to reflect the changes you make in your workspace. This is important - *don't modify code inside the local repository - only ever edit files in your workspace.* The local repository contains a load of files that Git uses to keep track of your version controlled content. If you start messing around with these files, you'll more than likely break something!

Next, we'll be looking at how to get your Git workspace set up. We'll also discuss the basic workflow you should use when using Git.

Setting up Git
**************
Setting up your Git workspace is a straightforward process. Once everything is set up, you will begin to make sense of the directory structure that Git uses. Assume that you have signed up for a new account on `GitHub <https://github.com/>`_ and `created a new repository on the service <https://help.github.com/articles/create-a-repo>`_ for your project. With your remote repository setup, follow these steps to get your local repository and workspace setup on your computer. We'll assume you will be working from your ``<workspace>`` directory.

#. Open a terminal and navigate to your home directory (e.g. ``cd ~``).
#. *Clone* the remote repository - or in other words, make a copy of it. Check out how to do this below.
#. Navigate into the newly created directory. That's your workspace in which you can add files to be version controlled!

.. _requirements-git-clone-label:

How to Clone a Remote Repository
................................
Cloning your repository is a straightforward process with the ``git clone`` command. Supplement this command with the URL of your remote repository - and if required, authentication details, too. The URL of your repository varies depending on the provider you use. If you are unsure of the URL to enter, it may be worth querying it with your search engine or asking someone in the know.

For GitHub, try the following command, replacing the parts below as appropriate:

``$ git clone https://<USERNAME>:<PASSWORD>@github.com/<OWNER>/<REPO_NAME>.git <workspace>``

where you replace
	- ``<USERNAME>`` with your GitHub username;
	- ``<PASSWORD>`` with your GitHub password;
	- ``<OWNER>`` with the username of the person who owns the repository;
	- ``<REPO_NAME>`` with the name of your project's repository; and
	- ``<workspace>`` with the name for your workspace directory. Although optional, we will specify it here to create the ``<workspace>`` directory.

If all is successful, you should see some positive messages in your terminal or Command Prompt alerting you to the fact that the clone has been successful.

The Directory Structure
.......................
Once you have cloned your remote repository onto your local computer, navigate into the directory with your terminal, Command Prompt or GUI file browser. If you have cloned an empty repository the workspace directory should appear empty. This directory is therefore your blank workspace with which you can begin to add files for your project.

However, the directory isn't blank at all! On closer inspection, you will notice a hidden directory called ``.git``. Stored within this directory are both the local repository and index. Do not alter the contents of the ``.git`` directory. Doing so could damage your Git setup - and break version control functionality. *Your newly-created workspace directory therefore contains the workspace, local repository and index.*

Final Tweaks
............
With your workspace setup, now would be a good time to make some final tweaks. Here, we discuss two cool features you can try which could make your life (and your team members') a little bit easier.

When using your Git repository as part of a team, any changes you make will be associated with the username you use to access your remote Git repository. However, you can also specify your full name and e-mail address to be included with changes that are made by you on the remote repository. This is really easy to do. Simply open a Command Prompt/terminal and navigate to your workspace. From there, issue two commands: one to tell Git your full name, and the other to tell Git your e-mail address.

``$ git config user.name "John Doe"``

``$ git config user.email "johndoe123@me.com"``

Obviously, replace the example name and e-mail address with your own. We don't want random commits from some guy called John Doe! How unlucky would it be if you were actually called John Doe?

Anyway, moving on to the second feature. Git provides you with the capability to stop - or ignore - particular files from being added to version control. For example, you may not wish a file containing unique keys to access web services from being added to version control. If the file were to be added to the remote repository, anyone could theoretically access the file by cloning the repository.

With Git, files can be ignored by including them in the ``.gitignore`` file. This file which should reside in the root of your workspace. When adding files to version control, Git parses this file. If a file that is being added to version control is listed within ``.gitignore``, the file is ignored. Each line of ``.gitignore`` should be a separate file entry. Check out the following example:

``config/api_keys.py``

``*.pyc``

In this example file, there are two entries. The first one prompts git to ignore the file ``api_keys.py`` residing within the ``config`` directory. The second entry prompts Git to ignore *all* instance of files with a ``.pyc`` extension. This is really cool: you can use *wildcards* to make generic entries if you need to!

Basic Commands and Workflow
***************************
With your repository cloned and ready to go on your local computer, you're ready to get to grips with the Git workflow. This section shows you the basic Git workflow - and the associated Git commands you can issue.

.. _fig-git-sequence:

.. figure:: ../images/git-sequence.svg
	:figclass: align-center
	
	A diagram depicting the basic workflow and associated commands of interacting with a Git repository.

We have provided a pictorial representation of the basic Git workflow in Figure :num:`fig-git-sequence`. Match each of the numbers in the blue circles to the numbered descriptions below.

1. Starting Off
...............
Before you can start work on your project, you must prepare Git for your forthcoming geek session. If you haven't yet sorted out your project's Git workspace, you'll need to ``clone`` the repository to obtain a copy of all of its files. Check out Section :ref:`requirements-git-clone-label` for more information on how to achieve this.

If you have previously made a clone of the remote repository, it's good practice to get into the habit of updating you local copy by using the ``git pull`` command. This 'pulls' changes from the remote repository. By doing this, you'll be working from the same page as your team members, which will help keep the issue of conflicting file contents from making your life a nightmare.

2. Doing Some Work!
...................
Once your workspace has been updated with the latest changes, the onus is on you to do some work! Within your workspace, you can take existing files and modify them. You can delete them too, or add new files to be version controlled.

It's not all plain sailing, however. You must be aware that as you work away, you need to keep Git up-to-date on the list of files you have added, removed or updated by modifying the *local index*. The list of files stored within the local index are then used to perform your next *commit*, which we'll be discussing in the next step. To keep Git informed, there are several Git commands which let you update the local index. Three of the commands are near-identical to those that were discussed in Chapter :ref:`requirements-label`, with the addition of a ``git`` prefix.

- The first command ``git add`` allows you to request Git to add a particular file to the next commit for you. A common newbie mistake is to assume that ``git add`` is used for adding new files to your repository only - *this is not the case! You must tell Git what modified files you wish to commit, too!* The command can be used in the fashion ``git add <filename>``, where ``<filename>`` is the name of the file you wish to add to your next commit. Multiple files and directories can be added with the command ``git add .`` - `but be careful with this <http://stackoverflow.com/a/16969786>`_!

- ``git mv`` performs the same function as the Unix ``mv`` command - it moves files. The only difference between the two is that ``git mv`` updates the local index for you before moving the file. Specify the filename with the syntax ``git mv <filename>``. For example, with this command you can move files to a different directory within your repository. This will be reflected in your next commit.

- ``git cp`` allows you to make a copy of a file or directory while adding references to the new files into the local index for you. The syntax is the same as ``git mv`` above where the filename or directory name is specified thus: ``git cp <filename>``.

- The command ``git rm`` adds a file or directory delete request into the local index. While the ``git rm`` command does not delete the file straight away, the requested file or directory is removed from your filesystem and the Git repository upon the next commit. The syntax is the same as the above commands, where a filename can be specified thus: ``git rm <filename>``. Note that you can add a large number of requests to your local index in one go, rather than removing each file manually. For example, ``git rm -rf media/`` creates delete requests in your local index for the ``media/`` directory. The ``r`` switch enables Git to *recursively* remove each file within the ``media/`` directory, while ``f`` allows Git to *forcibly* remove the files. Check out the `Wikipedia page <http://en.wikipedia.org/wiki/Rm_(Unix)#Options>`_ on the ``rm`` command for more information.

Lots of changes between commits can make things pretty confusing. You may easily forgot what files you've already instructed Git to remove, for example. Fortunately, you can run the ``git status`` command to see a list of files which have been modified from your current working directory, but haven't been added to the local index for processing. Check out typical output from the command below to get a taste of what you can see.

.. code-block:: python
	
	$ git status
	
	# On branch master
	# Changes to be committed:
	#   (use "git reset HEAD <file>..." to unstage)
	#
	#	modified:   chapters/requirements.rst
	#
	# Changes not staged for commit:
	#   (use "git add/rm <file>..." to update what will be committed)
	#   (use "git checkout -- <file>..." to discard changes in working directory)
	#
	#	modified:   ../TODO.txt
	#	modified:   chapters/deploy.rst
	#	deleted:    chapters/index.rst
	#	deleted:    images/css-font.png
	#	modified:   images/git-sequence.pdf
	#	modified:   omnigraffle/git-sequence.graffle
	#

For further information on this useful command, check out the `official Git documentation <http://git-scm.com/docs/git-status>`_.

3. Committing your Changes
..........................
We've mentioned *committing* several times in the previous step - but what on earth does it mean? In the world of Git, committing is when you save changes - which are listed in the local index - that you have made within your workspace. The more often you commit, the greater the number of opportunities you'll have to revert back to an older version of your code if things go disastrously wrong! Make sure you commit often - but don't commit an incomplete or broken version of a particular module or function! There's a lot of online discussion about when the ideal time to commit is - `have a look on this Stack Overflow page <http://stackoverflow.com/questions/1480723/dvcs-how-often-and-when-to-commit-changes>`_ for the opinions of several developers.

To commit, you issue the ``git commit`` command. Any changes to existing files that you have indexed will be saved to version control at this point. Additionally, any files that you've requested to be copied, removed, moved or added to version control via the local index will be undertaken at this point. When you commit, you are updating the *HEAD* of your local repository. The HEAD is essentially the *latest commit at the top of the pile* - have a look at `this Stack Overflow page <http://stackoverflow.com/questions/2304087/what-is-git-head-exactly>`_ for more information.

As part of a commit, it's incredibly useful to your future self and others to explain why you committed when you did. You can supply an optional message with your commit if you wish to do so - though we highly recommend it. Instead of simply issuing ``git commit``, run the following amended command.

``$ git commit -m "Updated helpers.py to include a Unicode conversion function, str_to_unicode()."``

From the example above, you can see that using the ``-m`` switch followed by a string provides you with the opportunity to append a message to your commit. Be as explicit as you can, but don't write too much. People want to see at a glance what you did, and do not want to be bored with a long essay. At the same time, don't be too vague. Simply specifying ``Updated helpers.py`` may tell a developer what file you modified, but they will require further investigation to see exactly what you changed.

.. note:: Although frequent commits may be a good thing, you will want to ensure that what you have written actually *works* before you commit. This may sound silly, but it's an incredibly easy thing to not think about. Committing code which doesn't actually work can be infuriating to your team members if they then rollback to a version of your project's codebase which is broken!

4. Synchronising your Repository
................................
After you've committed your local repository and committed your changes, you're just about ready to send your commits to the remote repository by *pushing* your changes. However, what if someone within your group pushes their changes before you do? This means your local repository will be out of sync with the remote repository, making any ``git push`` command very difficult to do!

It's therefore always a good idea to check whether changes have been made on the remote repository before updating it. Running a ``git pull`` command will pull down any changes from the remote repository, and attempt to place them within your local repository. If no changes have been made, you're clear to push your changes. If changes have been made and cannot be easily rectified, you'll need to do a little bit more work.

In scenarios such as this, you have the option to *merge* changes from the remote repository. After running the ``git pull`` command, a text editor will appear in which you can add a comment explaining why the merge is necessary. Upon saving the text document, Git will merge the changes in the remote repository to your local repository.

.. note:: If you do see a text editor on your Mac or Linux installation, it's probably the `vi <http://en.wikipedia.org/wiki/Vi>`_ text editor. If you've never used vi before, check out `this helpful page containing a list of basic commands <http://www.cs.colostate.edu/helpdocs/vi.html>`_ on the Colorado State University Computer Science Department website. If you don't like vi, `you can change the default text editor <http://git-scm.com/book/en/Customizing-Git-Git-Configuration#Basic-Client-Configuration>`_ that Git calls upon. Windows installations most likely will bring up Notepad.

5. Pushing your Commit(s)
.........................
*Pushing* is the phrase used by Git to describe the sending of any changes in your local repository to the remote repository. This is the way in which your changes become available to your other team members, who can then retrieve them by running the ``git pull`` command in their respective local workspaces. The ``git push`` command isn't invoked as often as committing - *you require one or more commits to perform a push.* You could aim for one push per day, when a particular feature is completed, or at the request of a team member who is desperately after your updated code.

To push your changes, the simplest command to run is:

``$ git push origin master``

As explained on `this Stack Overflow question and answer page <http://stackoverflow.com/questions/7311995/what-is-git-push-origin-master-help-with-gits-refs-heads-and-remotes>`_, this command instructs the ``git push`` command to push your local master branch (where your changes are saved) to the *origin* (the remote server from which you originally cloned). If you are using a more complex setup involving `branching and merging <http://git-scm.com/book/en/Git-Branching-Basic-Branching-and-Merging>`_, alter ``master`` to the name of the branch you wish to push.

If what you are pushing is particularly important, you can also optionally alert other team members to the fact they should really update their local repositories by pulling your changes. You can do this through a *pull request.* Issue one after pushing your latest changes by invoking the command ``git request-pull master``, where master is your branch name (this is the default value). If you are using a service such as GitHub, the web interface allows you to generate requests without the need to enter the command. Check out `the official GitHub website's tutorial <https://help.github.com/articles/using-pull-requests>`_ for more information.

Recovering from Mistakes
************************
This section presents a solution to a coder's worst nightmare: what if you find that your code no longer works? Perhaps a refactoring went terribly wrong, someone changed something, or everything is so terribly messed up you have no idea what happened. Whatever the reason, using a form of version control always gives you a last resort: rolling back to a previous commit. This section details how to do just that. We follow the information given from `this Stack Overflow <http://stackoverflow.com/questions/2007662/rollback-to-an-old-commit-using-git>`_ question and answer page.

.. warning:: You should be aware that this guide will rollback your workspace to a previous iteration. Any uncommitted changes that you have made will be lost, with a very slim chance of recovery! Be wary. If you are having a problem with only one file, you could always view the different versions of the files for comparison. Have a look `at this Stack Overflow page <http://stackoverflow.com/a/3338145>`_ to see how to do that.

Rolling back your workspace to a previous commit involves two distinct steps:

- determining which commit to roll back to; and
- performing the rollback.

To determine what commit to rollback to, you can make use of the ``git log`` command. Issuing this command within your workspace directory will provide a list of recent commits that you made, your name and the date at which you made the commit. Additionally, the message that is stored with each commit is displayed. This is where it is highly beneficial to supply commit messages that provide enough information to explain what is going on. Check out the following output from a ``git log`` invocation below to see for yourself.

::

	commit 88f41317640a2b62c2c63ca8d755feb9f17cf16e                      <- Commit hash
	Author: John Doe <someaddress@domain.com>                            <- Author
	Date:   Mon Jul 8 19:56:21 2013 +0100                                <- Date/time

	    Nearly finished initial version of the requirements chapter      <- Message

	commit f910b7d557bf09783b43647f02dd6519fa593b9f
	Author: John Doe <someaddress@domain.com>
	Date:   Wed Jul 3 11:35:01 2013 +0100

	    Added in the Git figures to the requirements chapter.

	commit c97bb329259ee392767b87cfe7750ce3712a8bdf
	Author: John Doe <someaddress@domain.com>
	Date:   Tue Jul 2 10:45:29 2013 +0100

	    Added initial copy of Sphinx documentation and tutorial code.

	commit 2952efa9a24dbf16a7f32679315473b66e3ae6ad
	Author: John Doe <someaddress@domain.com>
	Date:   Mon Jul 1 03:56:53 2013 -0700

	    Initial commit

From this list, you can choose a commit to rollback to. For the selected commit, you must take the commit hash - the long string of letters and numbers. To demonstrate, the top (or HEAD) commit hash in the example output above is ``88f41317640a2b62c2c63ca8d755feb9f17cf16e``. You can select this in your terminal and copy it to your computer's clipboard.

With your commit hash selected, you can now rollback your workspace to the previous revision. You can do this with the ``git checkout`` command. The following example command would rollback to the commit with hash ``88f41317640a2b62c2c63ca8d755feb9f17cf16e``.

``$ git checkout 88f41317640a2b62c2c63ca8d755feb9f17cf16e .``

Make sure that you run this command from the root of your workspace, and do not forget to include the dot at the end of the command! The dot indicates that you want to apply the changes to the entire workspace directory tree. After this has completed, you should then immediately commit with a message indicating that you performed a rollback. Push your changes and alert your team members. From there, you can start to recover from the mistake by putting your head down and getting on with your project.

Exercises
*********
If you haven't undertaken what we've been discussing in this chapter already, you should go through everything now to ensure your system and repository is ready to go.

First, ensure that you have setup your environment correctly. Install all of the prerequisites, including Python 2.7.5 and Django 1.7. Django should be installed by Pip, the package manager.

Once that is complete, create a new Git repository on Github for your project. To try out the commands, you can create a new file ``readme.md`` in the root of your workspace. The file `will be used by GitHub <https://help.github.com/articles/github-flavored-markdown>`_ to provide information on your project's GitHub homepage.

- Create the file, and write some introductory text to your project.
- Add the file to the local index upon completion of writing, and commit your changes.
- Push the new file to the remote repository and observe the changes on the GitHub website.

Once you have completed these basic steps, you can then go back and edit the file some more. Add, commit and push - and then try to revert to the initial version to see if it all works as expected.


Upon completion of these exercises, all that is left for us to discuss is the environment you just setup. While all may be good just now, what if you have another Python application that requires a different version to run? This is where the concept of `virtual environments <http://simononsoftware.com/virtualenv-tutorial/>`_ comes into play. Virtual environments allow multiple installations of Python and their relevant packages to exist in harmony, without disrupting one another. This is the generally accepted approach to configuring a Python setup nowadays. We don't go into much detail about them in this chapter now but you will be using a virtual environment when it comes to deploying your application. For now though, `check out this article <http://dabapps.com/blog/introduction-to-pip-and-virtualenv-python/>`_ to read up on what they are, and how they can benefit you.

.. note:: There are many more advanced aspects of Git that we have not covered here, such as branching and merging. There are many fantastic tutorials available online if you are interested in taking your super-awesome version control skills a step further. For more details about such features take a look at this `tutorial on getting started with Git <http://veerasundar.com/blog/2011/06/git-tutorial-getting-started/>`_, the `Git Guide <http://rogerdudler.github.io/git-guide/>`_ or `Learning about Git Branching <http://pcottle.github.io/learnGitBranching/>`_.

