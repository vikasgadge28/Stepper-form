/** @format */

import Stepper from "./Screen/Stepper";
import { FormProvider } from './useContext';
function App() {
  return (
    <FormProvider>
      <Stepper />
    </FormProvider>
  );
}

export default App;
