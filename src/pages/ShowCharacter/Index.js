import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Container, Heading } from "@chakra-ui/layout";

import { useHistory, useLocation } from "react-router-dom";
export default function ShowCharacter() {
  const { state } = useLocation();
  let history = useHistory();

  function backHome() {
    history.push("/");
  }
  return (
    <Container>
      <Heading>{state.name}</Heading>
      <Image
        type="image"
        src={`${state.thumbnail.path}.${state.thumbnail.extension}`}
      />
      <h1>{state.description}</h1>
      <br />
      <li>{state.series.items.map((e) => e.name)}</li>
      <Button justifyItems="center" mt="30px" type="button" onClick={backHome}>
        Back
      </Button>
    </Container>
  );
}
