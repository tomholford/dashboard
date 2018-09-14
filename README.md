# Global Friends Dashboard

With today's technology nothing can keep friends apart. Even if they are located on opposite sides of the world, there are numerous technologies that can put them directly in contact with one another.

Let's say one friend is living in Tokyo and the other in San Francisco; whenever they talk they tend to ask how the weather is, the latest regional news, etc. Instead of repetitively asking for this information directly from each other why not just have a page that puts all this information into one aggregated space - a dashboard!


## Widget Ideas

* Current weather
* Weather forecast
* Time
* Currency exchange rate
* Stocks
* Articles (Drudge, Japan Today, etc)
* Word of the day (different languages)

## Develop

[Yarn](https://yarnpkg.com/en/)and [Parcel](https://parceljs.org/) are used for development and deployment.

```bash
yarn global add parcel-bundler
yarn # install deps
yarn start # start dev server, visit the link shown in terminal
```

## Deploy

By default, the `yarn deploy` command is configured to deploy to [Firebase](https://www.firebase.com).

```bash
yarn build # optimized for production
yarn deploy # deploy to your hosting provider
```

## Contributing
