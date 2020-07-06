# react-scrollspy

React scrollspy component

This component is under development

#### Roadmap :
Export dist

## install
```
npm install @nuagedelait/react-scrollspy --save
```

## use

You should compose the element you want to spy with the ScrollSpy. It renders and Fragment so it will not mess with your dom structure.
If you compose several items, the first one will be the reference and will receive classes and data

#### Roadmap :
add data and classes to all child elements.

```
import ScrollSpy from '@nuagedelait/react-scrollspy';

const Component = (props) => {

  return(
    <ScrollSpy>

    ... Content to animate

    </scrollspy>

  )
}

```

## result

The component add class ```inview``` to his reference if the element top/left corner enter the view.

The reference receive also a progress status from -1 to 1 (right to left or bottom to top) and associated classes :

|bottom|center|top|
|-|-|-|
|inviewY_b_100, inviewY_b_90, inviewY_b_80,...,inviewY_b_10 |inviewY_0|inviewY_t_10,inviewY_t_20,...,inviewY_t_100|

|right|center|left|
|-|-|-|
|inviewX_r_100, inviewY_r_90, inviewX_r_80,...,inviewX_r_10 |inviewX_0|inviewX_l_10,inviewX_l_20,...,inviewX_l_100|

#### Roadmap :
Handle only top/left corner or full object.

```
<img class="inview inviewY_b_20" delta={deltaX:0,deltaY:0.2}/>
```


## Options

```
ex : <ScrollSpy offsetX={100} delayIn={200}/>
```

|option|type|unit|effect|default|
|-|-|-|-|-|
|offsetX|number|px|horizontal offset on trigger in /  out (left and right)|0|
|offsetY|number|px|vertical offset on trigger in / out (left and right)|100|
|delayIn|number|ms|delay on trigger in view|0|
|delayOut|number|ms|delay on trigger out view|0|
|animateOnce|boolean|true/false|once in is trigger, never trigger in or out anymore|false|
|ignoreX|boolean|true/false|ignore horizontal scroll|true|
|ignoreY|boolean|true/false|ignore vertical scroll|false|
|target|mixed|"parent" or dom element|set another dom lement or the parent of the spy as reference|null (use the first child))|
