import {
  useLocation,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
export default function useRouter() {
  let location = useLocation();
  let navigate = useNavigate();
  let [search] = useSearchParams();
  let params = useParams();
  return { location, navigate, search, params };
}
