import { Circle, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { all, createRef, createSignal, waitFor } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const circleAreaTxt = createRef<Txt>()
  const circle = createRef<Circle>()

  const radius = createSignal(1)
  const area = createSignal(() => Math.PI * radius() * radius())

  view.add(
    <Rect
      width={"100%"}
      height={"100%"}
      fill={"#222222"}
      layout
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={24}
    >
      <Rect
        layout
        gap={16}
      >
        <Txt
          text={"AREA:"}
          fill={"#ffffff"}
        />
        <Txt
          ref={circleAreaTxt}
          text={""}
          fill={"#ffffff"}
        />
      </Rect>
      <Circle
        ref={circle}
        fill={"#ff0000"}
        size={100}
      />
    </Rect>
  )

  var a = area().toFixed(6).toString()
  yield* circleAreaTxt().text(a, 1).wait(.5)

  radius(2)
  a = area().toFixed(6).toString()
  yield* all(
    circleAreaTxt().text(a, 1),
    circle().size(200, 1),
    waitFor(2)
  )

  radius(4)
  a = area().toFixed(6).toString()
  yield* all(
    circleAreaTxt().text(a, 1),
    circle().size(400, 1),
    circle().fill("rgb(255, 204, 0)", 1),
    waitFor(2)
  )
});
