# Food Connect: Search Engine Response Page

This is a Trie + levenshtein distance based, mobile-ready, bootstrap - Jquery powered Search engine response page which comes with default dataset of some marvel characters and lets you add/index your own entries for you to use later.

In this terrible time of chaos and death, the heartening news is that there are many lending a helping hand to people in need. People are organising food for those who are in _no position to cook_. But there was a need for connecting all of them together.

This Project is solution for those looking for nutritious meals in different places throughout India that are tasty and prepared and delivered with all precautionary measures in place.

## Features

- Lists all searchable entries
- Let's you add into searchable entries by submiting simple form that stores your entry into localstorage
- Remembers your search history
- gives search suggestions as you type
- autocorrects (Did you mean "XYZ") when you searched with wrong spellings


## Tech

This Project uses a number of open source projects:

- [Twitter Bootstrap](https://getbootstrap.com) - great UI boilerplate for modern web apps and to make the UI responsive!
- [JQuery](https://jquery.com) - Primarily for the ease of DOM manipulation
- [autosuggest-trie](https://github.com/moroshko/autosuggest-trie) - Minimalistic trie implementation for autosuggest and autocomplete components in pure javascript.
- [Browserify](http://browserify.org) - Browserify lets you require('modules') in the browser by bundling up all of your dependencies. It is used to bundle autosuggest-trie and js-levenshtein to be used on browsers.
- [js-levenshtein](https://github.com/gustf/js-levenshtein) - Pure JS implementation calculating the Levenshtein distance between two strings.

## Installation

SERP requires [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) to install and bundle JS dependecies.

Install the node and npm if it is not installed and do the following.

```
npm install -g browserify
npm install autosuggest-trie
npm install js-levenshtein
```

Once installed, move ahead to bundle the dependencies with browserify:

```
browserify main.js -o bundle.js
```

## Deployment

You are free to deploy and host it with absolutely any hosting/web service. The repository has index.html which serves as default page and is implicitly recognised as default home page of any hosted web whereever you deploy it. 

For simplicity, you can just clone the repo make your own changes as you need and use your own repo with netlify or similar services to link your github repository for an automated github event trigger based continuous deployment.

to know more follow step by step guide here: https://www.netlify.com/blog/2016/10/27/a-step-by-step-guide-deploying-a-static-site-or-single-page-app



## License

MIT

