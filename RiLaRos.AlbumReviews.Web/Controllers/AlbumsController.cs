using RestSharp;
using RiLaRos.AlbumReviews.Web.Models;
using System.Collections.Generic;
using System.Web.Mvc;

namespace RiLaRos.AlbumReviews.Web.Controllers
{
    public class AlbumsController : Controller
    {
        // GET: Albums
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetPhotos(int albumId)
        {
            var client = new RestClient("https://jsonplaceholder.typicode.com/photos?albumId=" + albumId);

            var response = client.Execute<List<Photo>>(new RestRequest());

            return PartialView("_PhotosPartial", response.Data);
        }
    }
}