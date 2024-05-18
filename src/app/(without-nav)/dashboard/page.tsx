"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React, { useState, ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { scanBongkahan, scanBrondolan } from "@/utils/services/scan-service";
import { LoaderCircle } from "lucide-react";

const imageRequest = z.object({
  image: z.any(),
});

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image),
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

const Dashboard = () => {
  const [brondolanLoading, setBrondolanLoading] = useState<boolean>(false);
  const [bongkahanLoading, setBongkahanLoading] = useState<boolean>(false);
  const [brondolanResult, setBrondolanResult] = useState<string>("");
  const [bongkahanResult, setBongkahanResult] = useState<string>("");
  const [brondolanImage, setBrondolanImage] = useState("");
  const [bongkahanImage, setBongkahanImage] = useState("");

  const brondolanForm = useForm<z.infer<typeof imageRequest>>({
    resolver: zodResolver(imageRequest),
  });

  const bongkahanForm = useForm<z.infer<typeof imageRequest>>({
    resolver: zodResolver(imageRequest),
  });

  const fileBrondolan = brondolanForm.register("image");

  const onSubmitBrondolan = async (data: z.infer<typeof imageRequest>) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    setBrondolanLoading(true);

    try {
      const response = await scanBrondolan(formData);

      const result = await response.json();

      if (response.status !== 200) {
        console.log(result.errors);
      }

      const predictionResult = result.status.data.classType;
      setBrondolanResult(predictionResult);
      setBrondolanLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fileBongkahan = bongkahanForm.register("image");

  const onSubmitBongkahan = async (data: z.infer<typeof imageRequest>) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    setBongkahanLoading(true);

    try {
      const response = await scanBongkahan(formData);

      const result = await response.json();

      if (response.status !== 200) {
        console.log(result.errors);
      }

      const predictionResult = result.status.data.classType;
      setBongkahanResult(predictionResult);
      setBongkahanLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col space-y-2 md:space-y-4">
      <div>Dashboard</div>
      <div className="flex flex-col space-y-4 rounded-md border p-4 shadow-md">
        <div className="flex w-full flex-col justify-between space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
          <div className="gap-x flex w-full flex-col items-center justify-center space-y-4 rounded-md p-4">
            <h1 className="text-center text-2xl font-bold">Brondolan</h1>
            {brondolanImage ? (
              <img
                src={brondolanImage}
                alt="brondolan"
                className="aspect-square h-auto w-[250px] rounded-md object-cover lg:w-[300px] xl:w-[400px]"
              />
            ) : (
              <div className="flex aspect-square h-auto w-[250px] flex-col items-center justify-center rounded-md bg-gray-300 object-cover lg:w-[300px] xl:w-[400px]">
                <p>Image Appear Here</p>
              </div>
            )}

            <span className="text-center font-semibold">
              {brondolanResult ? (
                brondolanResult
              ) : (
                <p className="font-medium text-muted-foreground">
                  Result appear here
                </p>
              )}
            </span>
            <Form {...brondolanForm}>
              <form
                onSubmit={brondolanForm.handleSubmit(onSubmitBrondolan)}
                className="space-y-8"
              >
                <FormField
                  control={brondolanForm.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex w-full flex-col space-y-2">
                          <Input
                            type="file"
                            className="cursor-pointer"
                            accept="image/*"
                            {...fileBrondolan}
                            onChange={(event) => {
                              field.onChange(
                                event.target?.files?.[0] ?? undefined,
                              );
                              const { files, displayUrl } = getImageData(event);
                              setBrondolanImage(displayUrl);
                              field.onChange(files);
                            }}
                          />
                          {brondolanLoading ? (
                            <Button disabled>
                              <LoaderCircle
                                className="animate-spin"
                                size={16}
                              />
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              disabled={!brondolanForm.getValues("image")}
                            >
                              Predict
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <div className="gap-x flex w-full flex-col items-center justify-center space-y-4 rounded-md p-4">
            <h1 className="text-center text-2xl font-bold">Bongkahan</h1>
            {bongkahanImage ? (
              <img
                src={bongkahanImage}
                alt="bongkahan"
                className="aspect-square h-auto w-[250px] rounded-md object-cover lg:w-[300px] xl:w-[400px]"
              />
            ) : (
              <div className="flex aspect-square h-auto w-[250px] flex-col items-center justify-center rounded-md bg-gray-300 object-cover lg:w-[300px] xl:w-[400px]">
                <p>Image Appear Here</p>
              </div>
            )}
            <span className="text-center font-semibold">
              {bongkahanResult ? (
                bongkahanResult
              ) : (
                <p className="font-medium text-muted-foreground">
                  Result appear here
                </p>
              )}
            </span>

            <Form {...bongkahanForm}>
              <form
                onSubmit={bongkahanForm.handleSubmit(onSubmitBongkahan)}
                className="space-y-8"
              >
                <FormField
                  control={bongkahanForm.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex w-full flex-col space-y-2">
                          <Input
                            type="file"
                            className="cursor-pointer"
                            accept="image/*"
                            {...fileBongkahan}
                            onChange={(event) => {
                              field.onChange(
                                event.target?.files?.[0] ?? undefined,
                              );
                              const { files, displayUrl } = getImageData(event);
                              setBongkahanImage(displayUrl);
                              field.onChange(files);
                            }}
                          />
                          {bongkahanLoading ? (
                            <Button disabled>
                              <LoaderCircle
                                className="animate-spin"
                                size={16}
                              />
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              disabled={!bongkahanForm.getValues("image")}
                            >
                              Predict
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
