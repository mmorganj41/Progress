import { Dimmer, Loader} from 'semantic-ui-react';
import "./Loading.css";

const Loading = ({children}) => (
  <div className='loading flex'>
      <Dimmer active inverted>
        <Loader inverted size='massive'>Loading</Loader>
        {children}
      </Dimmer>
  </div>
)

export default Loading;