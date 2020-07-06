
import React from "react";
import ScrollSpy from '../src/ScrollSpy.js';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import "@babel/polyfill";

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  document.body.removeChild(container);
  container = null;
});

describe("mount tests" ,() =>{
  it('Empty Component should mount', () => {
    // Test first render and componentDidMount
    act(() => {
      ReactDOM.render(<ScrollSpy/>, container);
    });
  })
  it('Component with one child should mount', () => {
    // Test first render and componentDidMount
    act(() => {
      ReactDOM.render(<ScrollSpy><img/></ScrollSpy>, container);
    });
  })
  it('Component with several childs should mount', () => {
    // Test first render and componentDidMount
    act(() => {
      ReactDOM.render(<ScrollSpy><img/><img/><img/><img/></ScrollSpy>, container);
    });
  })

})

const View = (props) =>{
  return(
    <div id="view" style={{width:'400px',height:'400px',overflow:'scroll'}}>
      <div id="scrollDiv" style={{width:'800px',height:'800px'}}>
        <ScrollSpy offsetX={0} offsetY={0}>
          <div id="spied" style={{width:'40px',height:'40px'}}/>
        </ScrollSpy>
      </div>
    </div>);
}

describe("scroll tests" ,() =>{
  it('Add class to childnode', () => {
    jest.useFakeTimers();
    act(() => {
      ReactDOM.render(<View/>, container);
    });
    act(() => {
      container.querySelector('#scrollDiv').dispatchEvent(new MouseEvent('scroll', {bubbles: true}));
    });
    act(() => {
      jest.runAllTimers(); // trigger setTimeout
    });
    expect(container.querySelector('#spied').classList.value).toBe('inviewY_t_100 inview')
  })
})
