# Weather Analytics Dashboard - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface Layer                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐         ┌──────────────────────────────┐  │
│  │ Home Screen  │────────▶│  WeatherAnalytics.tsx        │  │
│  │ (index.tsx)  │         │  (Main Dashboard)            │  │
│  └──────────────┘         └──────────────────────────────┘  │
│                                      │                        │
│                                      │ Displays               │
│                                      ▼                        │
│                           ┌──────────────────┐               │
│                           │ WeatherHeader    │               │
│                           │ (Location Info)  │               │
│                           └──────────────────┘               │
│                                      │                        │
│                                      │ Renders                │
│                                      ▼                        │
│                    ┌─────────────────────────────┐           │
│                    │  Horizontal FlatList        │           │
│                    │  (7 Chart Cards)            │           │
│                    └─────────────────────────────┘           │
│                                      │                        │
│                    ┌─────────────────┴─────────────────┐     │
│                    │                                   │     │
│              ┌─────▼─────┐                    ┌───────▼──┐  │
│              │ ChartCard │ ◀─── Wraps ───────▶│  Charts  │  │
│              │ (Focusable)│                    │ (7 types)│  │
│              └─────┬─────┘                    └──────────┘  │
│                    │                                         │
│                    │ On Select                               │
│                    ▼                                         │
│      ┌──────────────────────────────────────┐               │
│      │   Full-Screen Chart Views            │               │
│      ├──────────────────────────────────────┤               │
│      │ • WeatherBarChartScreen.tsx          │               │
│      │ • WeatherLineChartScreen.tsx         │               │
│      │ • WeatherPieChartScreen.tsx          │               │
│      │ • WeatherDonutChartScreen.tsx        │               │
│      │ • WeatherScatterChartScreen.tsx      │               │
│      │ • WeatherBubbleChartScreen.tsx       │               │
│      │ • WeatherGaugeChartScreen.tsx        │               │
│      └──────────────────────────────────────┘               │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Component Layer                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐     ┌──────────────────┐              │
│  │  ChartCard       │     │  WeatherHeader   │              │
│  │  (Wrapper)       │     │  (Info Display)  │              │
│  └──────────────────┘     └──────────────────┘              │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Chart Components                         │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ • BarChartComponent.tsx                               │  │
│  │ • LineChartComponent.tsx                              │  │
│  │ • PieChartComponent.tsx      ◀── NEW                  │  │
│  │ • DonutChartComponent.tsx                             │  │
│  │ • ScatterChartComponent.tsx                           │  │
│  │ • BubbleChartComponent.tsx                            │  │
│  │ • GaugeChartComponent.tsx                             │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Service Layer                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  weatherApi.ts                                       │   │
│  │  ┌────────────────────────────────────────────────┐ │   │
│  │  │ fetchWeatherData(city: string)                 │ │   │
│  │  │   ↓                                            │ │   │
│  │  │ • Constructs API URL                           │ │   │
│  │  │ • Makes HTTP request                           │ │   │
│  │  │ • Validates response                           │ │   │
│  │  │ • Returns typed data                           │ │   │
│  │  └────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           │ HTTP Request                     │
│                           ▼                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    External API                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Weatherstack API                                    │   │
│  │  http://api.weatherstack.com/current                 │   │
│  │  ┌────────────────────────────────────────────────┐ │   │
│  │  │ Returns:                                       │ │   │
│  │  │ • Location data                                │ │   │
│  │  │ • Current weather                              │ │   │
│  │  │ • Air quality metrics                          │ │   │
│  │  │ • Astronomical data                            │ │   │
│  │  │ • Wind information                             │ │   │
│  │  └────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Type System                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  weather.ts (TypeScript Interfaces)                  │   │
│  │  ┌────────────────────────────────────────────────┐ │   │
│  │  │ • WeatherResponse                              │ │   │
│  │  │ • WeatherLocation                              │ │   │
│  │  │ • CurrentWeather                               │ │   │
│  │  │ • AirQuality                                   │ │   │
│  │  │ • AstroData                                    │ │   │
│  │  │ • WeatherRequest                               │ │   │
│  │  └────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌──────────────┐
│ User Opens   │
│ Dashboard    │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ WeatherAnalytics     │
│ useEffect() triggers │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ fetchWeatherData()   │
│ API Call             │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Weatherstack API     │
│ Returns JSON         │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Parse & Validate     │
│ Type Checking        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ setWeatherData()     │
│ Update State         │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Transform Data       │
│ for Charts           │
└──────┬───────────────┘
       │
       ├─────────────────┬─────────────────┬─────────────────┐
       ▼                 ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Air Quality  │  │ Weather      │  │ Wind         │  │ UV Index     │
│ Bar Chart    │  │ Line Chart   │  │ Scatter      │  │ Gauge        │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

## Navigation Flow

```
                    ┌─────────────────┐
                    │   Home Screen   │
                    └────────┬────────┘
                             │
                             │ Select "Weather Analytics"
                             ▼
                    ┌─────────────────┐
                    │ Main Dashboard  │
                    │ (Horizontal     │
                    │  Scroll)        │
                    └────────┬────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
                ▼            ▼            ▼
         ┌──────────┐ ┌──────────┐ ┌──────────┐
         │ Chart 1  │ │ Chart 2  │ │ Chart 3  │
         │ (Focus)  │ │          │ │          │
         └────┬─────┘ └──────────┘ └──────────┘
              │
              │ Press OK/Select
              ▼
         ┌──────────────────┐
         │ Full-Screen View │
         │                  │
         │ ┌──────────────┐ │
         │ │ Large Chart  │ │
         │ │              │ │
         │ │ Data Points  │ │
         │ │ (Navigate ←→)│ │
         │ └──────────────┘ │
         │                  │
         │ [Back Button]    │
         └────────┬─────────┘
                  │
                  │ Press Back
                  ▼
         ┌─────────────────┐
         │ Return to       │
         │ Dashboard       │
         └─────────────────┘
```

## Component Hierarchy

```
WeatherAnalytics
├── ScrollView
│   ├── WeatherHeader
│   │   ├── Location Info
│   │   ├── Temperature Display
│   │   ├── Weather Icon
│   │   └── Stats (Humidity, Wind, UV)
│   │
│   └── FlatList (Horizontal)
│       ├── ChartCard #1 (Air Quality)
│       │   └── BarChart
│       │       ├── YAxis
│       │       ├── XAxis
│       │       ├── Grid
│       │       ├── Bars
│       │       └── Labels
│       │
│       ├── ChartCard #2 (Weather Trends)
│       │   └── LineChart
│       │       ├── YAxis
│       │       ├── XAxis
│       │       ├── Grid
│       │       ├── Line
│       │       └── Decorators
│       │
│       ├── ChartCard #3 (Weather Factors)
│       │   └── PieChart
│       │       ├── Slices
│       │       └── Labels
│       │
│       ├── ChartCard #4 (Day/Night)
│       │   └── DonutChart
│       │       ├── Slices
│       │       └── Labels
│       │
│       ├── ChartCard #5 (Wind Direction)
│       │   └── ScatterChart
│       │       ├── YAxis
│       │       ├── XAxis
│       │       ├── Grid
│       │       └── Points
│       │
│       ├── ChartCard #6 (Pollutants)
│       │   └── BubbleChart
│       │       ├── YAxis
│       │       ├── XAxis
│       │       ├── Grid
│       │       └── Bubbles
│       │
│       └── ChartCard #7 (UV Index)
│           └── GaugeChart
│               ├── Background Circle
│               ├── Progress Arc
│               └── Value Label
```

## State Management

```
┌─────────────────────────────────────────┐
│         WeatherAnalytics State          │
├─────────────────────────────────────────┤
│                                         │
│  weatherData: WeatherResponse | null    │
│  loading: boolean                       │
│  error: string | null                   │
│  focusedIndex: number                   │
│                                         │
└─────────────────────────────────────────┘
         │
         │ Passed as props
         ▼
┌─────────────────────────────────────────┐
│           Chart Components              │
├─────────────────────────────────────────┤
│                                         │
│  data: number[] | ChartData[]           │
│  labels: string[]                       │
│  focusedIndex: number                   │
│  onFocusChange: (index) => void         │
│  onSelect?: (index) => void             │
│                                         │
└─────────────────────────────────────────┘
```

## TV Event Handling

```
┌─────────────────┐
│  TV Remote      │
│  Input          │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ useTVEventHandler       │
│ (React Native Hook)     │
└────────┬────────────────┘
         │
         ├──────────────┬──────────────┬──────────────┐
         ▼              ▼              ▼              ▼
    ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
    │ Left   │    │ Right  │    │ Select │    │ Back   │
    └───┬────┘    └───┬────┘    └───┬────┘    └───┬────┘
        │             │             │             │
        ▼             ▼             ▼             ▼
   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
   │Previous │  │  Next   │  │  Open   │  │ Return  │
   │ Chart/  │  │ Chart/  │  │  Full   │  │   to    │
   │  Point  │  │  Point  │  │ Screen  │  │Previous │
   └─────────┘  └─────────┘  └─────────┘  └─────────┘
```

## Focus Management

```
┌──────────────────────────────────────────┐
│         Focusable Elements               │
├──────────────────────────────────────────┤
│                                          │
│  ChartCard (focusable={true})            │
│    │                                     │
│    ├─ onFocus() → setFocused(true)       │
│    │   └─ Apply focused styles           │
│    │       • Border color                │
│    │       • Scale transform             │
│    │       • Shadow increase             │
│    │                                     │
│    └─ onBlur() → setFocused(false)       │
│        └─ Remove focused styles          │
│                                          │
└──────────────────────────────────────────┘
```

## Error Handling Flow

```
┌──────────────────┐
│ API Call         │
└────────┬─────────┘
         │
         ▼
    ┌────────┐
    │Success?│
    └───┬────┘
        │
    ┌───┴───┐
    │       │
    ▼       ▼
  Yes      No
    │       │
    │       ▼
    │  ┌──────────────┐
    │  │ Catch Error  │
    │  └──────┬───────┘
    │         │
    │         ▼
    │  ┌──────────────────┐
    │  │ setError(message)│
    │  └──────┬───────────┘
    │         │
    │         ▼
    │  ┌──────────────────┐
    │  │ Display Error UI │
    │  └──────────────────┘
    │
    ▼
┌──────────────────┐
│ Parse & Validate │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Update State     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Render Charts    │
└──────────────────┘
```

## Performance Optimization

```
┌─────────────────────────────────────────┐
│         Optimization Strategies         │
├─────────────────────────────────────────┤
│                                         │
│  1. Data Transformation                 │
│     • Parse once, use multiple times    │
│     • Memoize calculated values         │
│                                         │
│  2. Rendering                           │
│     • FlatList for efficient scrolling  │
│     • Lazy loading of full-screen views │
│     • Optimized chart components        │
│                                         │
│  3. State Management                    │
│     • Minimal re-renders                │
│     • Local state where possible        │
│     • Efficient focus tracking          │
│                                         │
│  4. API Calls                           │
│     • Single fetch on mount             │
│     • Error handling prevents retries   │
│     • Type validation prevents errors   │
│                                         │
└─────────────────────────────────────────┘
```

---

This architecture provides a scalable, maintainable, and performant solution for displaying weather analytics on TV devices with intuitive navigation and beautiful visualizations.
