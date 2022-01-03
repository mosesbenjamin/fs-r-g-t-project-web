import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({
        // don't make extra request to server on ssr pages
        pause: isServer()
    })
        let body = null;

        // data is loading
        if (fetching) {
          // user not logged in
        } else if (!data?.me) {
            body = (
                <>
                    <NextLink href="/login">
                        <Link color='white' mr={2}>login</Link>
                    </NextLink>
                    <NextLink href="/register">
                        <Link color='white'>register</Link>
                    </NextLink>
                </>
            )
          // user is logged in
        } else {
            body = (
                <Flex>
                    <Box mr={2} mt={2} color='white'>{data.me.username}</Box>
                    <Button 
                    onClick={() => {
                        logout();
                    }}
                    isLoading={logoutFetching}
                    >logout</Button>
                </Flex>
            )
        }
        return (
            <Flex 
                position='sticky'
                top={0}
                zIndex={1}
                bg='tan' 
                p={4}
                >
               <Box ml={'auto'}>
                  {body}
               </Box>
            </Flex>
        );
}