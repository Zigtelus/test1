import { MouseEvent, useRef, useState } from 'react';
import '../src/App.scss';


interface Item {
  left: number,
  right: number,
  top: number,
  botom: number
}

interface Main extends Item {}

function App() {

  const [itemClientX, setElementClientX] = useState<number>(0);
  const [itemClientY, setElementClientY] = useState<number>(0);
  const [cursorClientY, setCursorClientY] = useState<number>(0);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const areaRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);


  const mainWidth = mainRef.current ? mainRef.current.offsetWidth : 0;
  const mainWidthHalf = mainWidth / 2;

  const itemWidth = itemRef.current ? itemRef.current.offsetWidth : 0;
  const itemWidthHalf = itemWidth / 2;


  const item: Item = {
    left: itemClientX - itemWidthHalf,
    right: itemClientX + itemWidthHalf,
    top: itemClientY - itemWidthHalf,
    botom: itemClientY + itemWidthHalf
  };

  const main: Main = {
    left: mainRef.current ? mainRef.current?.offsetLeft : 0,
    right: mainRef.current ? mainRef.current?.offsetLeft + mainWidth : 0,
    top: mainRef.current ? mainRef.current.offsetTop : 0,
    botom: mainRef.current ? mainRef.current?.offsetTop + mainWidth : 0
  };



  const onDrag = (e: MouseEvent<HTMLDivElement>)=> {

    e.clientX > main.left && e.clientX < main.right &&
    setElementClientX(e.clientX - main.left)

    e.clientY > main.top && e.clientY < main.botom &&
    setElementClientY(e.clientY - main.top)

    e.clientX > main.right - itemWidthHalf &&
    setElementClientX(main.right - main.left - itemWidthHalf)

    e.clientX < main.left + itemWidthHalf &&
    setElementClientX(itemWidthHalf)

    e.clientY < main.top + itemWidthHalf &&
    setElementClientY(itemWidthHalf)

    e.clientY > main.botom - itemWidthHalf &&
    setElementClientY(main.botom - main.top - itemWidthHalf)

    setCursorClientY(e.clientX)
    
  };



  return <div
    className={'area'}
    onMouseMove={(e)=> onDrag(e)}
    ref={areaRef}
  >
    <div
      className={"main"}
      ref={mainRef}
    >
        <div 
          ref={itemRef}
          className={"item"}
          style={{
            left: `${item.left}px`,
            top: `${item.top}px`,
          }}
        >

        </div>
    </div>
  </div>
};

export default App;
