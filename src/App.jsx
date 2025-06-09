
import Body from "./components/Body";
import {Provider} from "react-redux"
import appStore from "./utils/AppStore";

export default function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
    
  );
}
