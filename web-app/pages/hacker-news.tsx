import {HackerNewsFeed} from "./components/hacker-news/hacker-news";
import { SignalProvider } from "./provider/signal";

export default function HackerNews() {
  return (
    <SignalProvider>
      <HackerNewsFeed />
    </SignalProvider>
  );
}
