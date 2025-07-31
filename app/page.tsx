
"use client"
import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";


// Protect HomeRoute (Cái này có tác dụng là người dùng phải đăng nhập thì mới vào được trang chủ)
// không đăng nhập thì về lại trang auth
// bởi vậy nên là phải call từ server trước và server thì lúc này trang 
// chưa được render sau khi kiểm tra từ server xong mới cho phép đăng nhập
// tại sao lại dùng serverAuth nó trả về user, mà ta phải dùng getSession


export default function Home() {
  const {data: movies = []} = useMovieList();
  const {data: favorites = []} = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  // if(movies) {
  //   console.log(movies)
  // }
 
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={favorites}/>
      </div>
    </>
  );
}
