import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { blue } from "../../constants/color";

export const VisuallyHidden = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: 1,
  whiteSpace: "nowrap",
});

export const Link = styled(LinkComponent)`
  color: #1089D3;
  text-decoration: none;
  padding: 1rem 2rem;
  background-color:Aliceblue;

  &:hover {
    background-color: #98BBDD;
    cursor:pointer;
  }
`;

export const InputBox = styled("input")`
width : 100%,
height : 100%;
border : 2px solid ${blue};
outline : none;
padding: 1.1rem 5rem;
border-radius: 1.5rem;
background-color : aliceblue;
`
export const SearchField = styled("input")`
width : 20vmax,
height : 100%;
border : 1px solid black;
outline : none;
padding: 0.8rem 2rem;
border-radius: 1.5rem;
background-color : aliceblue;
font-size: 1.1rem
`


