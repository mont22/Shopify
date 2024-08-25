// nativewind.d.ts
import "react-native";
import "nativewind";

declare module "react-native" {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  // Add other components if needed
  interface TouchableOpacityProps {
    className?: string;
  }

  interface ImageProps {
    className?: string;
  }
}
