import { NextResponse, NextRequest } from "next/server";

type ResponseData = {
  message: string;
  total?: number;
  data?: {
    [key: string]: any;
  };
};
export async function GET(request: NextRequest) {
  try {
    const { API_KEY_GLOBALNEWS, GLOBAL_NEWS_BASEURL } = process.env;
    console.log(
      "This is Everything from GlobalNews",
      API_KEY_GLOBALNEWS,
      GLOBAL_NEWS_BASEURL
    );
    const BaseUrl = `${GLOBAL_NEWS_BASEURL}/everything?q=Indonesia&from=2024-08=29&sortBy=publishedAt&apiKey=${API_KEY_GLOBALNEWS}`;
    let Arr: any = [];
    let JumlahData;
    await fetch(BaseUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.articles.length, "...jumlah data");

        Arr.push(data.articles);
        JumlahData = data.articles.length;
      })
      .catch((err) => console.log(err, "Upps Error Happened"));
    return NextResponse.json({
      message: "ok",
      total: JumlahData,
      data: Arr,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Something error happened",
      detail: err,
    });
  }
}
