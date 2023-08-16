# [dev.peviitor.ro](https://dev.peviitor.ro)

## Frontend
To build the app, go inside SPA and run "npm i" then "npm run build_php". The assets will be generated on root/dist

Don't forget to supply the website URL in .env (with no trailing slashes prefferably, so https://my-website.com good, https://not-my-website.com/ bad)

Check package.json for more scripts.

## Backend

Define all the variables in root/env.php. (API_GET and API_POST must have a trailing slash here... so we need https://you/know/the/url/)

## Uploading the website to cpanel

Build the Frontend first. Copy paste everything but the SPA, .gitignore, LICENSE and README.md files in the public_html.

You will need to modify/create a .htaccess file. See the .htaccess on the testdomain for what you need to write.

You will need to modify/create a php.ini file. Again, see on testdomain.

## Footnotes

Needless to say, **DO NOT COMMIT** the .env or env.php with values. Same reasoning for why there's no .htaccess & php.ini files.
