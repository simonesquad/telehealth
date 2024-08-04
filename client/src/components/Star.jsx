import { StarIcon } from "@chakra-ui/icons"

const Star = ({ rating = 0, star = 2 }) => ( 
    <StarIcon color={rating >= star || rating === 0 ? 'cyan.500' : 'gray.200'} />
);

export default Star;