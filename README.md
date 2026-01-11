# Bemobile Challenge

This is the Bemobile Challenge I've been given, developed with [Next.js](https://nextjs.org).

## Getting Started

### Requirements

Make sure you have installed:

- Node.js >= 18.
- npm >= 9.

> Tested with Node v22.11.0 and npm v11.6.1

### Installation

First, clone the repository and navigate to the folder:

```bash
git clone https://github.com/mriverre8/bemobile-challenge.git
cd bemobile-challenge
```

Then, install the required dependencies:

```bash
npm install
```

Create a `.env` file at the root of the project and add your Comic Vine API key:

```bash
COMIC_VINE_API_KEY=YOUR_API_KEY
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing

Run unit tests:

```bash
npm run test
```

### Linting

Run the linter:

```bash
npm run lint
```

### Build for Production

Build and start the production server:

```bash
npm run build
npm run start
```

## Client-Server Architecture

This project follows a [Client-Server](https://nextjs.org/learn/react-foundations/server-and-client-components) architecture provided by Next.js.

The client requests data from the server, which processes the request and sends the appropriate response back to the client. This allows the user to interact with the system, as the client displays the information received and enables actions based on the server’s response.

## Project Structure

```
bemobile-challenge/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── actions/             # Server actions / fetch endpoints
│   │   ├── character/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Character detail page
│   │   ├── globals.css          # CSS common variables
│   │   ├── layout.tsx           # App layout
│   │   └── page.tsx             # Home page / Favorites page
│   ├── components/              # Reusable components
│   ├── context/                 # React Context
│   ├── css/                     # CSS modules
│   ├── tests/                   # Unit tests
│   ├── types/                   # TypeScript definitions
│   └── utils/                   # Utility functions
```

## Additional Information

I've finally used Comic Vine API since the given one was deprecated/removed.
