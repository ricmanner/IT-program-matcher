# Programmatchning

**[Try it out](https://it-program-matcher.vercel.app/)**

A web app that helps students at Högskolan i Skövde find which program fits their course interests.

## What it does

Select courses you're interested in and instantly see which of the 4 programs has the best match. Simple percentage-based scoring shows how well each program aligns with your selections.

**Features:**
- Real-time matching as you select courses
- Dark/light mode toggle
- Responsive design for mobile and desktop
- Swedish interface
- Links to official program pages

## Built with

Next.js 13, React 18, and CSS custom properties for theming. Uses localStorage for dark mode persistence.

## How the matching works

```javascript
Match Score = (Your selected courses in the program) / (Total courses you selected)
```

**Example:**
- You select 4 courses
- Program A has 3 of them → 75% match
- Program B has 2 of them → 50% match

Pretty straightforward. The highest percentage wins.

## Tech details

- **State**: React hooks for real-time updates
- **Performance**: Memoized calculations
- **Data**: Static arrays of course IDs, filtered on the fly
- **Styling**: Pure CSS with gradients and animations

## Project structure

```
pages/          - Next.js routing
components/     - CourseSelector, ProgramList
hooks/          - useTheme for dark mode
data/           - 48 courses, 4 programs
styles/         - Global CSS with theme vars
```

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3001`

## License

MIT

**Live:** https://it-program-matcher.vercel.app/
