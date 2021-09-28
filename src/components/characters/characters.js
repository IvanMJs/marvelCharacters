import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

import { Button } from "@chakra-ui/button";
import { useHistory } from "react-router-dom";
import { Input } from "@chakra-ui/input";

export default function Characters() {
  // http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150

  //key private
  //6587f6906e994302c8b21d704486c260b661eab3
  //public key
  // fcc9e832e7b4d527b25c368965336c68
  //ts: 1

  // 16587f6906e994302c8b21d704486c260b661eab3fcc9e832e7b4d527b25c368965336c68
  //https://gateway.marvel.com:443/v1/public/characters/1017100?apikey=fcc9e832e7b4d527b25c368965336c68
  //hash: e7465dc8b1cb14c5328cf7542db60e31

  const [personajes, setPersonajes] = useState([]);
  const [search, setSearch] = useState("");

  const API_KEY = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=fcc9e832e7b4d527b25c368965336c68&hash=e7465dc8b1cb14c5328cf7542db60e31`;
  let history = useHistory();
  useEffect(() => {
    axios.get(API_KEY).then((res) => {
      setPersonajes(res.data.data.results);
    });
  }, [API_KEY]);

  function showCharacter(personSelected) {
    history.push({ pathname: "/show", state: personSelected });
  }
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredUsers = useMemo(
    () =>
      personajes.filter((user) => {
        const userBla = user.name.toLowerCase().includes(search.toLowerCase());

        return userBla;
      }),
    [personajes, search]
  );

  return (
    <Flex display="grid" textAlign="center" justifyItems="center">
      <Flex mt="10%" display="grid">
        <Flex>
          <Text textAlign="center">
            {" "}
            Made with react using hooks:
            <br />
            <li>useMemo</li>
            <li>useEffect</li>
            <li>useState</li>
            <li>useLocation</li>
            <li>useHistory</li>
          </Text>
        </Flex>

        <Text mt="30px">Search</Text>
        <Input
          color="#FFFFFF"
          margin="auto"
          maxWidth="80"
          textAlign="center"
          display="flex"
          placeholder="Name"
          size="md"
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </Flex>
      <SimpleGrid
        templateColumns="repeat(2, 1fr)"
        gap={4}
        mt="30"
        columns={1}
        spacing={10}
      >
        {filteredUsers.map((pers, index) => (
          <Box
            key={index}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            {console.log("hay dat")}
            <Image
              type="image"
              src={`${pers.thumbnail.path}.${pers.thumbnail.extension}`}
            />
            <Box p="6">
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                <p>{pers.name}</p>
                <Button
                  mt="30px"
                  type="button"
                  onClick={(x) => showCharacter(pers, x)}
                >
                  View
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Flex>
  );
}
