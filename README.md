# [dev.peviitor.ro](https://dev.peviitor.ro)

## Running on localhost

1. Install PHP 8.2 and XAMPP. Assuming you're using Windows, to make your life easier please install XAMPP under C:\\xampp. Also, please "Run as administrator" at every step of the install to avoid Windows shenanigans.
2. Go to the repo > SPA. Inside .env, set URL="http://localhost".
3. SPA > src > assets > styles > _partials > variables.scss: Edit the font paths to match the absolute paths in your computer. Untill we find a solution that uses relative font urls without having to generate an additional 6MBs worth of files called "source-maps" this will have to make do.
4. Under SPA directory, run "npm -i" followed by "npm run build_php". A dist directory will be generated in your repo root.
5. So far, we've configured and generated the frontend assets. Now comes the backend
6. First we're going to need our own GitHub and GitLab Oauth apps, but to spare us some text space we'll cover the GitHub one only since the process is similar.
7. On GitHub, go to Settings > Developer Settings > New Oauth App. Homepage should be set to "http://localhost" and callback should be set to "http://localhost/oauth/github/callback". Name your app whatever you like.
8. On GitLab, the process is about the same ("http://localhost", "http://localhost/oauth/gitlab/callback") , with the only difference being that you have to tick "read_api" on the access list.
9. Once you have your GitHub and GitLab apps running, fill in the appropriate URLs & secrets in the env.php file.
10. Copy paste the entire repo without SPA, .git, ReadME.md, .gitignore and LICENSE files in C:\\xampp\\htdocs
11. Finally, run XAMPP.exe, start Apache, and your localhost should be setup!

## Footnotes

If you wish, you can run the frontend app only. Go to SPA and run "npm run start". Any changes you make to the source files will be reflected live on your localhost website.

Needless to say, **DO NOT COMMIT** the .env or env.php with values.

## Known Bugs

"ESlint unable to resolve imports" -> just comment the line below in webpack.config.js and restart VSCode (remember to uncomment it when running the build command)
```javascript
  publicPath: env.target === "php" ? "dist/" : "./"
```
