import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { images } from "@/constants";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";
import { Link } from "expo-router";

// Zod schema for form validation
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Define the types for form data based on the schema
type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  // Initialize react-hook-form with zodResolver
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const [loading, setIsLoading] = useState(false);
  // Function to handle form submission
  const onSubmit = (data: SignInFormData) => {
    console.log("Form Data:", data);
    // Handle login logic here
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[80vh] justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-semibold font-psemibold">
            Log in to Aora
          </Text>

          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                title="Email"
                value={value}
                placeholder="Enter your email"
                handleChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                otherStyles="mt-7"
                error={errors.email?.message} // Show error message if validation fails
              />
            )}
          />

          {/* Password Field */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                title="Password"
                value={value}
                placeholder="Enter your password"
                handleChangeText={onChange}
                onBlur={onBlur}
                otherStyles="mt-7"
                error={errors.password?.message} // Show error message if validation fails
                isPasswordField={true} // Added this to enable password toggle
              />
            )}
          />

          {/* Submit Button */}
          <CustomButton
            title="Sign in"
            containerStyles="mt-7"
            isLoading={loading}
            handlePress={handleSubmit(onSubmit)}
          />
          <View className=" justify-center flex-row gap-2 pt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              className="text-lg text-secondary font-psemibold"
              href="/sign-up"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
