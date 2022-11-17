import { KitchenSinkView } from "./components/kitchen-sink/kitchen-sink";
import { SignalProvider } from "./provider/signal";

export default function KitchenSink() {
  return (
    <SignalProvider>
      <KitchenSinkView />
    </SignalProvider>
  );
}
