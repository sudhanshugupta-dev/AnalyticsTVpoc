# Expo Router TV Analytics POC 👋

![Apple TV screen shot](https://github.com/douglowder/examples/assets/6577821/a881466f-a7a0-4c66-b1fc-33235c466997)
![Android TV screen shot](https://github.com/douglowder/examples/assets/6577821/815c8e01-8275-4cc1-bd57-b9c8bce1fb02)

A proof of concept showing cross-platform analytics dashboards (TV + mobile + web) built with [Expo](https://expo.dev), [Expo Router](https://docs.expo.dev/router/introduction), and the [React Native TV fork](https://github.com/react-native-tvos/react-native-tvos). Real-time market data is streamed from Finnhub websockets and rendered across multiple chart types.

Loom video (analytics walkthrough): https://www.loom.com/share/98b68402e53b40ad8b78b1ca702d780f

## What this POC covers

- Cross-platform navigation with Expo Router targeting TV-first UX (focusable cards, remote navigation).
- Real-time trading analytics powered by the Finnhub WebSocket feed.
- A gallery of charts (Victory + SVG) to validate rendering on large screens and touch devices.
- Weather analytics variant to demonstrate theming and dataset swaps.

## Analytics folder structure (high level)

- `app/index.tsx` — TV-first landing page listing real-time dashboards and secondary analytics.
- `app/MainScreen.tsx` — Classic analytics board with bar, pie, line, area, scatter, bubble, donut, and gauge charts.
- `app/*Realtime.tsx` — Trading-focused screens (line, bar, scatter, gauge, candlestick, gantt, trade feed) that consume live Finnhub data.
- `app/Weather*.tsx` — Weather-themed dashboards mirroring the core chart types.
- `services/realTimeSocket.ts` — Finnhub websocket helper (subscribe/unsubscribe + message handling).
- `data/dummy_data.ts` — Sample data for non-live charts.
- `components/FocusableCard.tsx` — Focusable TV navigation tile used across the menus.

## Chart catalog in this POC

- Real-time trading: trades feed, line chart, bar (30s aggregation), scatter plot (30s), gauge set, candlestick (5s OHLC), gantt (session timeline).
- Static analytics: bar, pie, line, stacked area, scatter, bubble, donut, gauge.
- Weather variants: bar, pie, line, scatter, bubble, donut, gauge.

## 🚀 Run on TV (main path)

```sh
yarn
EXPO_TV=1 yarn prebuild:tv   # enables @react-native-tvos/config-tv
yarn ios                     # Apple TV
yarn android                 # Android TV
yarn web                     # local web preview
```

> You can also set `"isTV": true` in `app.json` instead of exporting `EXPO_TV=1`.

## 📱 Run on mobile/web

```sh
yarn
yarn prebuild
yarn ios        # iOS
yarn android    # Android
yarn web        # local web preview
```

## Real-time socket + Finnhub

- `services/realTimeSocket.ts` opens a websocket to `wss://ws.finnhub.io` and subscribes to a symbol list. It emits parsed trade messages to any screen via an `onMessage` callback, and returns an `unsubscribe` helper.
- Screens such as `app/RealtimeTradeScreen.tsx`, `app/LineChartRealtime.tsx`, and `app/BarChartRealtime.tsx` supply the symbol list and render the incoming trades.
- Provide a valid Finnhub API token before running real-time screens. Replace the placeholder token strings in `services/realTimeSocket.ts` and `app/RealtimeTradeScreen.tsx` (or wire an env loader) with your token.

## Development notes

- Uses TV-specific Metro resolution (`*.tv.tsx`, `*.ios.tv.tsx`, `*.android.tv.tsx`) via `metro.config.js`.
- Starter Expo commands still apply; edit screens under `app/` to iterate quickly.
- To reset the starter example, run `npm run reset-project` (moves starter to `app-example/` and creates a blank `app/`).

## Deploy

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy`
- Deploy on iOS and Android using: `npx eas-cli build`
