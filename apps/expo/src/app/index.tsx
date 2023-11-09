import { useNavigation } from "expo-router/src/useNavigation";
import { useEffect } from "react";

// kind of gross but Stack.initialRouteName doesn't work
export default function Root() {
  const nav = useNavigation()
  useEffect(() => {
    nav.navigate('root', { screen: 'lookup/index' })
  }, [])
  return (
    <></>
  )
}
