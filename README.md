## Video Link
[video](https://youtu.be/4DUvCRTybLo)





This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the development server:

```bash
yarn install && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## UI approach
I created SVG images from the text using [iconomy](https://run.iconomy.app/). The prompt said to use "single-select" and "multi-select." I wasn't clear if this meant to implement dropdowns as might be inferred from that terminology. If I had to implement that I would look into using a UI component library such as [prime react](https://primereact.org/multiselect/) for that. However I felt that firstly a toggle would be better instead of a single select in the case of the first question as there are only two options. However, I felt that it would be even better to have icons that the use can click on instead of different options as this would be a better user experience. I am also assuming that the user can't select both `other` and another work type.

My approach also accounts for the ability to easily maintain the senarios. In `types.ts` all of the options are defined. To add a new one, all that needs to be done is add it there, add a corresponding image in `/public`, and then update the corresponding business logic in `server-spoof`.

With more time, I would also:
- remove next.js since I only implemented a frontend
- make all the svgs have white background text
- make sure all the options show consistently with smaller screen sizes
- better differentiate the styling of the next and clear buttons
- improve error message (not needed since API is spoofed)
- improve loading text and replace it with a spinner

## API & Database Spec
In this approach, I spoofed the API request. I didn't see a need or benefit of creating a backend for this assignment, but if I had to, I could have an GET endpoint to get the same information as does the `spoofServer` function. I don't think a database would be helpful unless we were differentiate submissions by user, which is explicitly indicated as out of scope. If we were tracking which users made which submission, we would want to have a database so that we could store this information. Otherwise, if we are just interested in knowing what the submissions were, we could track this with analytics rather than having a database. We could do this with a vendor such as [Amplitude](https://amplitude.com/).

As requested, to persist the result of a submission, we could have a POST request endpoint to submit. We would then store the details (interior/exterior and features requested) provided about the submission including the time, region of user, corresponding permit type. We would want to keep track of the permit type incase the business logic later changes. We would also be interested in which user submitted the request, but that is out of scope.

## Optimal Design
To support additional use cases such as different permitting senarios and municipalities, I could move the business logic to the backend. There, we could define the schema for each permitting senario in a database and access it using prisma. Updating this information could then be done through internal application. We could correspondingly have the information about municipalities and their business logic relationship with permitting senarios defined in the backend in a format that is easy to maintain and update.
