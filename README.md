dominikschreiber.com
====================

This is the code of my portfolio website [dominikschreiber.com](http://dominikschreiber.com).

directory structure
-------------------

The directory is structured to allow serving `/` directly. It is used to push to my own server (via `git push production master`), what triggers a post-receive hook that checks out the directory to `/var/www`. Simple and stupid, but it works like a charm. See [Mike Everhart's tutorial](http://mikeeverhart.net/git/using-git-to-deploy-code/) on how to do it.

All code is actually in the `/src` folder (except for `Gruntfile.js` and stuff), everything else is static (like the `/papers` and `/talks` folders). When getting `dominikschreiber.com/src` one is redirected to `github.com/dominikschreiber/dominikschreiber.com` (this site) with a htaccess redirect.

license
-------

As there are two types of content in this repository (i.e. code and scientific work), there are two licenses to represent this.

**Scientific work** (everything in `/papers` and in `/talks`) is released under the [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).

**Code** (everything else) is released under the [MIT License](LICENSE).