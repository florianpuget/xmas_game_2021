

// JavaScript program to find whether an array
// is subset of another array

// Return 1 if arr2[] is a subset of arr1[]
function isSubset(arr1, arr2)
{
	let i = 0, j = 0;
    let m = arr1.length, n = arr2.length;

	if (m < n)
		return 0;

	// Sort both the arrays
	arr1.sort((a, b) => a - b);
	arr2.sort((a, b) => a - b);

	// Iterate till they donot exceed their sizes
	while (i < n && j < m)
	{
		
		// If the element is smaller than
		// Move aheaad in the first array
		if (arr1[j] < arr2[i])
			j++;
			
		// If both are equal, then move
		// both of them forward
		else if (arr1[j] == arr2[i])
		{
			j++;
			i++;
		}

		// If we donot have a element smaller
		// or equal to the second array then break
		else if (arr1[j] > arr2[i])
			return 0;
	}
	return (i < n) ? false : true;
}

// Driver Code
let arr1 = [ 11, 1, 13, 21, 3, 7 ];
let arr2 = [ 11, 3, 1, 7 ];

let m = arr1.length;
let n = arr2.length;

if (isSubset(arr1, arr2))
	console.log("arr2[] is subset of arr1[] ");
else
	console.log("arr2[] is not a subset of arr1[] ");

// This code is contributed by Manoj.
