import { Dimmer, Loader} from 'semantic-ui-react';
import "./Loading.css";

const Loading = () => (
  <div className='loading flex'>
      <Dimmer active inverted>
        <Loader inverted size='massive'>Loading</Loader>
      </Dimmer>
  </div>
)

export default Loading;