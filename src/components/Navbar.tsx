import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from 'next/link'
import { useMeQuery } from "../generated/graphql";

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const [{ data, fetching }] = useMeQuery()
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
                    >logout</Button>
                </Flex>
            )
        }
        return (
            <Flex bg='tan' p={4}>
               <Box ml={'auto'}>
                  {body}
               </Box>
            </Flex>
        );
}