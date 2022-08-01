import {
  useLocation,
  useSearchParams,
  useParams,
  useNavigate,
} from "react-router-dom";

function useRouter() {
  const location = useLocation();
  const [search] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();
  return [location, search, params, navigate];
}

export default useRouter;
