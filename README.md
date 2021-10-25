# Anyaral
This is the codebase for the [Anyaral Toolbox](https://app.anyaraltoolbox.com) web app. It's a reference app for [World of Twilight](http://worldoftwilight.com), a table top skirmish war game.

## Built with
- [Next.js](https://nextjs.org/docs) - React framework
- [Tailwind](https://v1.tailwindcss.com) - CSS framework
- [next-pwa](https://github.com/shadowwalker/next-pwa) - PWA plugin for  Next.js

## Developing
Pull requests are welcome. For anything other than bug fixes, please open an issue first to discuss what you would like to change.

### Requirements
- `Node.js` version 12 or later
- `Yarn` version 1

### How to run
Install the dependencies:
```bash
yarn
```

Then run the development server:

```bash
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

#### PWA precaching
`next-pwa` doesn't perform precaching in development mode, so in order to test PWA precaching you need to build the production version.

1. Build the production version
```bash
yarn build
```

2. Run the production server
```bash
yarn start
```

3. Test on http://localhost:3000

### Things to keep in mind before making changes
This responsive app is designed with progressive enhancement and accessibility in mind. Please respect those constraints.

#### Responsive web design
All pages should adapt to the screen width. Users can access the app on mobile, tablet or desktop.

#### Progressive enhancement
- The website works with JavaScript disabled
- Enabling JavaScript uses NextJS's optimisations such as client-side navigation and prefetching
- On platforms that support PWA, the website works offline and can be installed as a stand-alone app

#### Accessibility
The website should be as accessible as possible. The approach is to:
- Use semantic HTML systematically
- Research best practice: Not all commonly used solutions are accessible.
- For CSS
  - colours: should have enough contrast, ideally AAA, at least AA
  - font size: user preferences should be respected
- Test keyboard navigation
- Test with a screen reader

## License
### World of Twilight assets
This app uses original data and images from [World of Twilight](http://worldoftwilight.com), (c) Mike Thorp. This includes:
- The contents of the `/data` folder
- icons located in the `/public` folder

### Source code
The rest of the project is licensed under the [MIT license](https://choosealicense.com/licenses/mit/).

## Acknowledgements
This project is based on Fred Fiquet's [Anyaral Toolbox iOS app](https://www.anyaraltoolbox.com/ios/). 

Thanks to Mike Thorp for his enthusiastic support.