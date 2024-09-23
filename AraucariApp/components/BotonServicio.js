import { Link } from "expo-router";
import { Image, Pressable, Text } from "react-native";

export default function BotonServicio({
	textClassName,
	url,
	dirImagen,
	nombre,
}) {
	return (
		<Link href={url} asChild>
			<Pressable
				className={`flex-auto aspect-square items-center justify-center ${textClassName}`}
			>
				<Image className="h-1/2 aspect-square mb-2" source={dirImagen} />
				<Text className="font-bold text-lg">{nombre}</Text>
			</Pressable>
		</Link>
	);
}
