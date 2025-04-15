
interface IText {
  text: string
}

const TextComponent = (props: IText) => {
  return (
    <h1 title={props.text}>{props.text}</h1>
  )
}

export default TextComponent;
