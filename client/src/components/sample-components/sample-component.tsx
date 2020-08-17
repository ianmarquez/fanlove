import React from 'react';
import axios from 'axios';

export class SampleComponent extends React.Component {
  constructor(props: any) {
    super(props);
  }

  private async callserver(): Promise<any> {
    const res = await axios.get('http://localhost:8000/test', {
      params: {
        table: 'sample'
      }
    });

    console.log(res.data);
  }

  render(): React.ReactNode {
    return <div>
      This is a sample component.
      {this.callserver()}
    </div>
  }
}
