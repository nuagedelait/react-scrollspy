//SCROLSPY V1.1.0

import React,{useEffect,useRef,Fragment,useCallback} from 'react';
import PropTypes from 'prop-types';

const ScrollSpy = (props) => {

  //Since we are using fragment as parent, we use the first child as ref on the DOM
  const domTarget = useRef(null);
  //Source of the scroll, fallback to window in case of undefined
  const source = useRef(props.source);

  //Tracking of tasks
  let status = '';
  //settimeout ref for canceling
  let inTO = null;
  let outTO = null;

  const top = '_t_';
  const bottom = '_b_';
  const left = '_l_';
  const right = '_r_';
  const indexes = [-100,-90,-80,-70,-60,-50,-40,-30,-20,-10,0,10,20,30,40,50,60,70,80,90,100];

  const cleanClasses = (element) => {
    //Clean all classes
    const classesX = indexes.map(index => 'inviewX'+(index > 0 ? right+index : (index === 0 ? '_' : left)+index*-1));
    element.classList.remove.apply(element.classList,classesX);
    const classesY = indexes.map(index => 'inviewY'+(index > 0 ? bottom+index : (index === 0 ? '_' : top)+index*-1));
    element.classList.remove.apply(element.classList,classesY);
  }

  //Triggered when element enter the view
  const enterView = async (element,deltaX,deltaY) =>{
    element.classList.add('inview');

    //Execute custom function pass as prop (can be a promise)
    if(props.onEnter){
      await props.onEnter(element,deltaX,deltaY);
    }
    status='in';
  }

  //Triggered when element leave the view (can be a promise)
  const leaveView = async (element) =>{

    //Clean all progress classes
    cleanClasses(element);

    //Call whileinview with max delta to prevent speed scroll
    await whileInView(element,-1,-1);

    //Remove inview class
    element.classList.remove('inview');

    //Execute custom function pass as prop
    if(props.onLeave){
      await props.onLeave(element);
    }
    status='out';
  }

  //Triggered while element is in the view
  const whileInView = async (element,deltaX,deltaY) =>{
    /*
    Add classes to indicate % of the view ditance
    ex : Vertical values = from bottom inviewY_b_100,inviewY_b_90,... to screen center inviewY_0 to top ...,inviewY_b_90,inviewY_t_100
    */
    cleanClasses(element);

    //Prepare an oject ot add as attribute
    let attr = {}

    if(!props.ignoreX){
      element.classList.add('inviewX'+(deltaX < 0 ? right : (deltaX === 0 ? '_' : left)) + (deltaX < 0 ? -deltaX : deltaX)*100);
      attr.deltaX = deltaX;
    }
    if(!props.ignoreY){

      element.classList.add('inviewY'+(deltaY < 0 ? top : (deltaY === 0 ? '_' : bottom)) + (deltaY < 0 ? -deltaY : deltaY)*100);
      attr.deltaY = deltaY;
    }

    //Add the % from -1 to 1 as attribute
    element.setAttribute("delta",attr);

    //Execute custom function pass as prop
    if(props.whileInView){
      await props.whileInView(element,deltaX,deltaY);
    }
  }

  const onScroll =  useCallback((e) =>{

    //The function on scrolling

    let target = domTarget.current;

    if(props.target === 'parent'){
        target = target.parentNode;
    }

    //view bounds
    const view = {
      width:window.innerWidth,
      height:window.innerHeight
    }

    //Element bounds
    const bounds = target.getBoundingClientRect();

    if((bounds.top<=(view.height-props.offsetY) && bounds.top>=(0+props.offsetY)) || props.ignoreY){
      //Element is in view verticaly
      if((bounds.left<=(view.width-props.offsetX) && bounds.left>=(0+props.offsetX)) || props.ignoreX){
        //Element is in view horizontaly

        //Calculate % of distance from the middle of the screen (-1 to 1) for both axis
        //Calculated only if the axis is not ignored
        let progressX = 0;
        if(!props.ignoreX){
          progressX = Math.round((bounds.left-view.width/2)/(view.width/2-props.offsetX)*10)/10;
        }
        let progressY = 0;
        if(!props.ignoreY){
          progressY = Math.round((bounds.top-view.height/2)/(view.height/2-props.offsetY)*10)/10;
        }
        //Execute on scroll functions
        whileInView(domTarget.current,progressX,progressY)
        //Element is in view
        if(status !== 'animate' && status !== 'in'){

          //Execute only on enter
          status = 'animate';
          inTO = setTimeout(()=>{enterView(domTarget.current)},props.delayIn);
        }
      }else{
        //Element leave the view on left or right
        if(!props.animateOnce && status === 'in'){
          status = 'animate';
          outTO = setTimeout(()=>{leaveView(domTarget.current)},props.delayOut);
          return;
        }
      }
    }else{
      //Element leave the view on top or bottom
      if(!props.animateOnce && status === 'in'){
        status = 'animate';
        outTO = setTimeout(()=>{leaveView(domTarget.current)},props.delayOut);
        return;
      }
    }
  })

  useEffect(()=>{
    //Executed each time the target or the source change

    //Handle window fallback
    let scrollSource = source.current;
    if(scrollSource === undefined || scrollSource === null){
      scrollSource = window;
    }

    //Add the listener
    scrollSource.addEventListener('scroll',onScroll);

    return(()=>{
      //On unmount, clear timeouts and remove listener
      clearTimeout(inTO);
      clearTimeout(outTO);
      scrollSource.removeEventListener('scroll',onScroll);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[domTarget.current,source.current]);

  if(!props.children){
    return(<Fragment/>)
  }
  //if there's only one child, transform it to an array so we can map in the render
  let children = props.children;
  if(!Array.isArray(props.children)){
    children = [props.children]
  }

  return(<Fragment>
    {
      children && children.map((element,k)=>{
        if(k===0){
          //First child become the reference
          const Element = element.type;
          const elementProps = {
            key:k,
            ref:domTarget,
            ...element.props,
          }
          return(<Element {...elementProps}/>)
        }else{
          return(element)
        }
      })
    }
    </Fragment>)


};

ScrollSpy.propTypes = {
  spyid : PropTypes.string,
  offsetX : PropTypes.number,
  offsetY : PropTypes.number,
  delayIn : PropTypes.number,
  delayOut : PropTypes.number,
  animateOnce : PropTypes.bool,
  ignoreX : PropTypes.bool,
  ignoreY : PropTypes.bool,
  target : (props, propName, componentName) =>{
    if(props[propName] !== 'parent' && props[propName] instanceof HTMLElement){
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  }
};

ScrollSpy.defaultProps = {
  spyid : "",
  offsetX :0,
  offsetY : 100,
  delayIn : 0,
  delayOut : 0,
  animateOnce : false,
  ignoreX : true,
  ignoreY : false,
  target:null
};

export default ScrollSpy;
