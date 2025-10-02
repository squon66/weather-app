# Weather App 🌤️

A modern React-based weather application that provides detailed weather forecasts for any location within the United States using the National Weather Service API.

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5174`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality


## API Integration
- making api calls from client using fetch.  Perhaps a more robust solution would be to use create a nodejs server and call endpoints to have server make the weather service calls and data logic.
- This might be particularly beneficial because of the consecutive API's required

## UI
- I didn't focus on responsive design but should work well on mobile.

## Coding Standards
- started to implement with Typescript but was too time consuming for this project so passed.
- felt that using MUI components might be a little overkill for this small project but wanted to implement just demonstrate use
- Focused on trying to make components as small as possilbe and code readable.  With more time could probably go further.
- Probably could have used Typography component for more of the text but chose not to because of time
- I generally use function declarations for functional components and function expressions for all other functions which is just an aesthetic choice

## Form Components
- I chose react-hook-form for it's simplicty.  Considered Formik but would be more involved
- using useFormContext in custom components so I don't have to pass props around
- considered using newer action property and useActionState but not not familiar enough but also seems more valuable for server components

## Styling

- Using material UI styled components for the most part.
- Material-UI components for consistent design
- using sx property where appropriate
- Custom CSS for specialized components (weather charts)

## Error Handling

- utilizing the use-form-hook error handling for client side validation
- user is prevented from submitting until all fields are valid.
- apparently the /points service fails is coordinates are not within US and returns a 400 error.  I'm handling that as a general error
- limiting latitude and longitudanal values to valid values
- limiting date picker to just 5 days
- removed manual date entry to avoid errors

## Performance

- did not use memoization techniques (React.memo, useMemo, useCallback) but react 19 with react compiler does a lot of that for you
- realize that I haven't configured the vite.config.js to enable react compiler


## Accessibility

I did not have time to focus on accessiblity.   Below are some areas where accessiblity would be beneficial
**General**
- use more aria and role values
- manage focus functionality and focus styles
**Form Accessibility**
- Add proper ARIA labels and descriptions to input fields
- Associate error messages with inputs using aria-describedby
- Add role="alert" for error announcements
- Use fieldsets and legends for form sections
**Chart Accessibility**
- Add role="img" and descriptive labels to bar charts
- Provide alternative text descriptions for screen readers
- Make charts keyboard navigable with tabIndex="0"
- Use role="progressbar" with proper ARIA attributes
**Screen Reader Support**
- Add live regions (aria-live) for dynamic content
- Create screen reader-only descriptions with .sr-only class
- Announce loading states and form submission results
**Keyboard Navigation**
- Ensure all interactive elements are keyboard accessible
- Add proper focus indicators with CSS
- Implement focus management for complex interactions

## Testing
- didn't have time to add unit tests

## Build Notes
- generated files are in the dist folder
- bundled js file is slightly larger than 500 MB but only a little.  Can look into reducing bundle size via minification or code splitting.  Another option is using rollup
